import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';

import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/Courses/CourseInfo/CourseInfo';

import { getToken } from './api/user';

import classes from './app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsAdmin,
	selectIsUserLoading,
	selectToken,
} from './store/user/userSelector';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { CourseForm } from './components/CourseForm/CourseForm';
import { AppDispatch, loadMeTest } from './store/user/userThunks';

function App() {
	const token = useSelector(selectToken);
	const isUserLoading = useSelector(selectIsUserLoading);
	const isAdmin = useSelector(selectIsAdmin);
	const dispatch = useDispatch<AppDispatch>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getToken()
			.then((token) => {
				if (token) {
					dispatch(loadMeTest);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className={classes.app}>
			<Header />
			{!loading && (
				<Routes>
					<Route
						element={
							<ProtectedRoute isAllowed={!token} redirectPath='/courses' />
						}
					>
						<Route path={'/registration'} element={<Registration />} />
						<Route path={'/login'} element={<Login />} />
					</Route>
					<Route
						element={
							<ProtectedRoute isAllowed={!!token} redirectPath='/login' />
						}
					>
						<Route path={'/courses'} element={<Courses />} />
						<Route path='/courses/:id' element={<CourseInfo />} />
						<Route
							element={
								<ProtectedRoute isAllowed={isAdmin} redirectPath='/courses' />
							}
						>
							<Route path={'/courses/add'} element={<CourseForm />} />
							<Route path={'/courses/update/:id'} element={<CourseForm />} />
						</Route>
					</Route>
					<Route path='*' element={<Navigate to='/courses' />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
