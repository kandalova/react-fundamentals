import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { REGISTRATION } from '../../constants/constants';
import { ISignUp } from '../../helpers/appTypes';

import classes from './registration.module.scss';
import { AppDispatch, signUpUser } from '../../store/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectRegistartionError } from '../../store/user/userSelector';

const initialValues: ISignUp = {
	name: '',
	email: '',
	password: '',
};

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
	name: yup.string().min(6).required(),
});

export function Registration() {
	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectRegistartionError);

	const onRegisterSubmit = async ({ name, email, password }: ISignUp) => {
		dispatch(signUpUser({ name, password, email }));
	};

	return (
		<div className={classes.container}>
			<div className={classes.form}>
				<h1>{REGISTRATION.HEADER}</h1>
				<Formik
					initialValues={initialValues}
					onSubmit={onRegisterSubmit}
					validationSchema={validationSchema}
				>
					<Form className={classes.inputs}>
						<Input id='name' labelText={REGISTRATION.NAME_PLACEHOLDER} />
						<Input id='email' labelText={REGISTRATION.EMAIL_PLACEHOLDER} />
						<Input
							id='password'
							labelText={REGISTRATION.PASSWORD_PLACEHOLDER}
							type='password'
						/>
						<Button text={REGISTRATION.BUTTON} />
					</Form>
				</Formik>
				<p>
					{REGISTRATION.TO_LOGIN} <Link to='/login'>{REGISTRATION.LOGIN}</Link>
				</p>
				<div className={error ? classes.show : classes.hide}>{error}</div>
			</div>
		</div>
	);
}
