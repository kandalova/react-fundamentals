import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { signIn } from '../../api/user';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { LOGIN } from '../../constants/constants';
import { ISignIn } from '../../helpers/appTypes';
import { getErrorString } from '../../helpers/errorTypeHandler';
import { userLogined } from '../../store/user/userActions';

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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLoginSubmit = async ({ email, password }: ISignIn) => {
		setError('');
		try {
			const loginedUserPayload = await signIn({ email, password });
			dispatch(userLogined(loginedUserPayload));
			navigate('/courses');
		} catch (error: unknown) {
			const message = getErrorString(error);
			setError(message);
		}
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
