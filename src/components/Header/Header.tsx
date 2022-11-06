import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../api/user';

import { Button } from '../../common/Button/Button';
import { HEADER } from '../../constants/constants';
import { userLogouted } from '../../store/user/userActions';
import { selectUser } from '../../store/user/userSelector';
import { Logo } from './components/Logo';

import classes from './header.module.scss';

export function Header() {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	function onLoginClick(): void {
		signOut(user.token).then(() => {
			dispatch(userLogouted());
			navigate('/login');
		});
	}

	return (
		<div className={classes.header}>
			<Logo />
			{user.isAuth && (
				<div className={classes.userInfo}>
					{user.isAuth && <p>{user.name}</p>}
					<Button
						text={user.isAuth ? HEADER.LOGOUT : HEADER.LOGIN}
						onClick={onLoginClick}
					/>
				</div>
			)}
		</div>
	);
}
