import React from 'react';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo';

import classes from './header.module.scss';

export function Header() {
	function onButtonClick(event: React.MouseEvent<HTMLElement>): void {
		console.log('Hello from header');
	}
	return (
		<div className={classes.header}>
			<Logo />
			<div className={classes.userInfo}>
				<p>UserName</p>
				<Button text='Login' onClick={onButtonClick} />
			</div>
		</div>
	);
}
