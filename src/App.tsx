import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { IUserPayload } from './helpers/appTypes';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';

import { getMe, getToken } from './api/user';
import { getCourses } from './api/courses';

import classes from './app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from './store/user/userSelector';
import { userLogined } from './store/user/userActions';
import { authorsLoaded } from './store/authors/authorsActions';
import { getAuthors } from './api/authors';
import { coursesLoaded } from './store/courses/coursesActions';

function App() {
	const navigate = useNavigate();
	const token = useSelector(selectToken);
	const dispatch = useDispatch();

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

		getCourses().then((courses) => dispatch(coursesLoaded(courses)));
		getAuthors().then((authors) => {
			dispatch(authorsLoaded(authors));
		});
	}, []);

	return (
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
						<Route path={'/courses/add'} element={<CreateCourse />} />
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
	);
}

export default App;
