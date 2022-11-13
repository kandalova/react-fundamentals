import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { LOGIN } from '../../constants/constants';
import { ISignIn } from '../../helpers/appTypes';
import { AppDispatch, loginUser } from '../../store/user/userThunks';

import classes from './../Registration/registration.module.scss';

const initialValues: ISignIn = {
	email: '',
	password: '',
};

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
});

export function Login() {
	const [error, setError] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();

	const onLoginSubmit = async ({ email, password }: ISignIn) => {
		setError('');
		dispatch(loginUser({ email, password }));
		// try {
		// 	const loginedUserPayload = await signIn({ email, password });
		// 	dispatch(userLogined(loginedUserPayload));
		// 	navigate('/');
		// } catch (error: unknown) {
		// 	const message = getErrorString(error);
		// 	setError(message);
		// }
	};

	return (
		<div className={classes.container}>
			<div className={classes.form}>
				<h1>{LOGIN.HEADER}</h1>
				<Formik
					initialValues={initialValues}
					onSubmit={onLoginSubmit}
					validationSchema={validationSchema}
				>
					<Form className={classes.inputs}>
						<Input id='email' labelText={LOGIN.EMAIL_PLACEHOLDER} />
						<Input
							id='password'
							labelText={LOGIN.PASSWORD_PLACEHOLDER}
							type='password'
						/>
						<Button text={LOGIN.BUTTON} />
					</Form>
				</Formik>
				<p>
					{LOGIN.TO_REGISTARTION}{' '}
					<Link to='/registration'>{LOGIN.REGISTRATION}</Link>
				</p>
				<div className={error ? classes.show : classes.hide}>{error}</div>
			</div>
		</div>
	);
}
