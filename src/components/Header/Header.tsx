import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUser, signOut } from '../../api/user';
import { Button } from '../../common/Button/Button';
import { HEADER } from '../../constants/constants';
import { IUser } from '../../helpers/appTypes';
import { Logo } from './components/Logo';

import classes from './header.module.scss';

const loginPaths = ['/login', '/registration'];

export function Header() {
	const [user, setUser] = useState<Omit<IUser, 'password'> | null>(null);
	const [isLogined, setIsLogined] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();

	function onLoginClick(): void {
		if (user) {
			signOut().then(setUser);
		}
		navigate('/login');
	}

	useEffect(() => {
		getUser()
			.then(setUser)
			.then(() => {
				setIsLogined(!loginPaths.includes(location.pathname));
			});
	}, [location]);

	return (
		<div className={classes.header}>
			<Logo />
			{isLogined && (
				<div className={classes.userInfo}>
					{user && <p>{user.name}</p>}
					<Button
						text={user ? HEADER.LOGOUT : HEADER.LOGIN}
						onClick={onLoginClick}
					/>
				</div>
			)}
		</div>
	);
}
