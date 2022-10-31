import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, redirect } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { IAuthor, ICourse, IUser } from './helpers/appTypes';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';
import { getUser, UserContext, saveUser, getToken } from './api/user';
import { CoursesContext, getCourses, saveCourses } from './api/courses';
import { AuthorsContext, getAuthors, saveAuthors } from './api/authors';

import classes from './app.module.scss';

function App() {
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [user, setUser] = useState<Omit<IUser, 'password'> | null>(null);
	const navigate = useNavigate();

	function createAuthor(author: Omit<IAuthor, 'id'>): void {
		saveAuthors(author).then(setAuthors);
	}
	function createCourse(course: Omit<ICourse, 'id'>): void {
		saveCourses(course)
			.then(setCourses)
			.then(() => navigate('/courses'));
	}
	function onLoginUser(user: Omit<IUser, 'password'> | null): void {
		saveUser(user)
			.then(setUser)
			.then(() => navigate('/courses'));
	}
	useEffect(() => {
		getToken().then((token) => {
			if (!token) {
				navigate('/login');
			} else {
				getUser().then(setUser);
			}
		});

		getCourses().then(setCourses);
		getAuthors().then(setAuthors);
	}, []);

	return (
		<UserContext.Provider value={user}>
			<CoursesContext.Provider value={courses}>
				<AuthorsContext.Provider value={authors}>
					<div className={classes.app}>
						<Header />
						<Routes>
							<Route path={'/registration'} element={<Registration />} />
							<Route
								path={'/login'}
								element={<Login onLoginUser={onLoginUser} />}
							/>
							<Route path={'/courses'} element={<Courses />} />
							<Route path='/courses/:id' element={<CourseInfo />} />
							<Route
								path={'/courses/add'}
								element={
									<CreateCourse
										createCourse={createCourse}
										createAuthor={createAuthor}
									/>
								}
							/>
						</Routes>
					</div>
				</AuthorsContext.Provider>
			</CoursesContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
