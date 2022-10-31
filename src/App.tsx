import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { IAuthor, ICourse } from './helpers/appTypes';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';
import { getToken } from './api/user';
import { CoursesContext, getCourses, saveCourses } from './api/courses';
import { AuthorsContext, getAuthors, saveAuthors } from './api/authors';

import classes from './app.module.scss';

function App() {
	const [authors, setAuthors] = useState<IAuthor[]>([]);
	const [courses, setCourses] = useState<ICourse[]>([]);
	const navigate = useNavigate();

	function createAuthor(author: Omit<IAuthor, 'id'>): void {
		saveAuthors(author).then(setAuthors);
	}
	function createCourse(course: Omit<ICourse, 'id'>): void {
		saveCourses(course)
			.then(setCourses)
			.then(() => navigate('/courses'));
	}
	useEffect(() => {
		getToken().then((value) => {
			if (!value) {
				navigate('/login');
			} else {
				navigate('/courses');
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
					</Routes>
				</div>
			</AuthorsContext.Provider>
		</CoursesContext.Provider>
	);
}

export default App;
