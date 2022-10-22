import React from 'react';
import classes from './button.module.scss';

interface IButton {
	text: string;
	onClick: () => void;
}

export function Button({ text, onClick }: IButton) {
	return (
		<button className={classes.button} onClick={onClick}>
			{text}
		</button>
	);
}
