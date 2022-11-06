import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { ICourse, IUserPayload } from './helpers/appTypes';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';

import { getMe, getToken } from './api/user';
import { CoursesContext, getCourses, saveCourses } from './api/courses';

import classes from './app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from './store/user/userSelector';
import { userLogined } from './store/user/userActions';
import { authorsLoaded } from './store/authors/authorsActions';
import { getAuthors } from './api/authors';

function App() {
	const [courses, setCourses] = useState<ICourse[]>([]);
	const navigate = useNavigate();
	const token = useSelector(selectToken);
	const dispatch = useDispatch();

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
				getMe(token).then((payload: IUserPayload) =>
					dispatch(userLogined(payload))
				);
			}
		});

		getCourses().then(setCourses);
		getAuthors().then((authors) => {
			dispatch(authorsLoaded(authors));
		});
	}, []);

	return (
		<CoursesContext.Provider value={courses}>
			<div className={classes.app}>
				<Header />
				<Routes>
					{!token && (
						<>
							<Route path={'/registration'} element={<Registration />} />
							<Route path={'/login'} element={<Login />} />
						</>
					)}
					{token && (
						<>
							<Route path={'/courses'} element={<Courses />} />
							<Route path='/courses/:id' element={<CourseInfo />} />
							<Route
								path={'/courses/add'}
								element={<CreateCourse createCourse={createCourse} />}
							/>
						</>
					)}
					<Route
						path='*'
						element={
							token ? <Navigate to='/courses' /> : <Navigate to='/login' />
						}
					/>
				</Routes>
			</div>
		</CoursesContext.Provider>
	);
}

export default App;
