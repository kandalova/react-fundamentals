import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signUp } from '../../api/user';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { REGISTRATION } from '../../constants/constants';
import { ISignUp } from '../../helpers/appTypes';
import { getErrorString } from '../../helpers/errorTypeHandler';

import classes from './registration.module.scss';

export function Registration() {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	const onRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');
		const user: ISignUp = { name, password, email };
		try {
			await signUp(user);
			navigate('/login');
		} catch (error: unknown) {
			const message = getErrorString(error);
			setError(message);
		}
	};

	return (
		<div className={classes.container}>
			<div className={classes.form}>
				<h1>{REGISTRATION.HEADER}</h1>
				<form className={classes.inputs} onSubmit={onRegisterUser}>
					<Input
						id='reg_name'
						labelText={REGISTRATION.NAME_PLACEHOLDER}
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<Input
						id='reg_email'
						labelText={REGISTRATION.EMAIL_PLACEHOLDER}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<Input
						id='reg_password'
						labelText={REGISTRATION.PASSWORD_PLACEHOLDER}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						type='password'
					/>
					<Button text={REGISTRATION.BUTTON} />
				</form>
				<p>
					{REGISTRATION.TO_LOGIN} <Link to='/login'>{REGISTRATION.LOGIN}</Link>
				</p>
				<div className={error ? classes.show : classes.hide}>{error}</div>
			</div>
		</div>
	);
}
