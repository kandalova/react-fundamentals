import { Formik, Form } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { saveUser, signIn } from '../../api/user';
import { UserContext } from '../../AppWrapper';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { LOGIN } from '../../constants/constants';
import { ISignIn, IUser } from '../../helpers/appTypes';
import { getErrorString } from '../../helpers/errorTypeHandler';

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
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	function onLoginUser(user: IUser): void {
		saveUser(user)
			.then(setUser)
			.then(() => navigate('/courses'));
	}

	const onLoginSubmit = async ({ email, password }: ISignIn) => {
		setError('');
		try {
			const loginedUser = await signIn({ email, password });
			onLoginUser(loginedUser);
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
