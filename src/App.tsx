import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { IAuthor, ICourse } from './helpers/appTypes';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';

import { getToken, getUser } from './api/user';
import { CoursesContext, getCourses, saveCourses } from './api/courses';
import { AuthorsContext, getAuthors, saveAuthors } from './api/authors';

import classes from './app.module.scss';
import { UserContext } from './AppWrapper';

function App() {
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [courses, setCourses] = useState<ICourse[]>([]);
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);

	function createAuthor(author: Omit<IAuthor, 'id'>): void {
		saveAuthors(author).then(setAuthors);
	}
	function createCourse(course: Omit<ICourse, 'id'>): void {
		saveCourses(course)
			.then(setCourses)
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
		<CoursesContext.Provider value={courses}>
			<AuthorsContext.Provider value={authors}>
				<div className={classes.app}>
					<Header />
					<Routes>
						<Route path={'/registration'} element={<Registration />} />
						<Route path={'/login'} element={<Login />} />
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
						<Route path='*' element={<Navigate to='/courses' />} />
					</Routes>
				</div>
			</AuthorsContext.Provider>
		</CoursesContext.Provider>
	);
}

export default App;
