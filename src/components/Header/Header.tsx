import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { HEADER } from '../../constants/constants';
import { selectUser } from '../../store/user/userSelector';
import { AppDispatch, logoutUser } from '../../store/user/userThunks';
import { Logo } from './components/Logo';

import classes from './header.module.scss';

export function Header() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={classes.header}>
			{/* <Link to={'/'}> */}
			<Logo />
			{/* </Link> */}
			{user.isAuth && (
				<div className={classes.userInfo}>
					{user.isAuth && <p>{user.name}</p>}
					<Button
						text={user.isAuth ? HEADER.LOGOUT : HEADER.LOGIN}
						onClick={() => dispatch(logoutUser)}
					/>
				</div>
			)}
		</div>
	);
}
