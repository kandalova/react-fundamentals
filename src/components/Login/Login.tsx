import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signIn } from '../../api/user';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { LOGIN } from '../../constants/constants';
import { IUser } from '../../helpers/appTypes';
import { getErrorString } from '../../helpers/errorTypeHandler';

import classes from './../Registration/registration.module.scss';

export function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	const onLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');
		const user: Omit<IUser, 'name'> = { password, email };
		try {
			await signIn(user);
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
				<form className={classes.inputs} onSubmit={onLoginUser}>
					<Input
						id='login_email'
						labelText={LOGIN.EMAIL_PLACEHOLDER}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<Input
						id='login_password'
						labelText={LOGIN.PASSWORD_PLACEHOLDER}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button text={LOGIN.BUTTON} />
				</form>
				<p>
					{LOGIN.TO_REGISTARTION}{' '}
					<Link to='/registration'>{LOGIN.REGISTRATION}</Link>
				</p>
				<div className={error ? classes.show : classes.hide}>{error}</div>
			</div>
		</div>
	);
}
