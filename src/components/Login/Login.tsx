import { Formik, Form } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { LOGIN } from '../../constants/constants';
import { ISignIn } from '../../helpers/appTypes';
import { selectLoginError } from '../../store/user/userSelector';
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
	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectLoginError);

	const onLoginSubmit = async ({ email, password }: ISignIn) => {
		dispatch(loginUser({ email, password }));
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
