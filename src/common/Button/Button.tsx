import React from 'react';
import classes from './button.module.scss';

interface IButton {
	text: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Button({ text, onClick }: IButton) {
	return (
		<>
			<button className={classes.button} onClick={onClick}>
				{text}
			</button>
		</>
	);
}
