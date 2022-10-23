import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import {
	CREATE_COURSE_TITLE,
	CREATE_COURSE_BUTTON,
} from '../../../../constants/constants';

import classes from './title.module.scss';

interface ITitle {
	value?: string;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Title({ value, onClick, onChange }: ITitle) {
	return (
		<div className={classes.title}>
			<Input
				id='course_title'
				value={value}
				onChange={onChange}
				labelText={CREATE_COURSE_TITLE}
			/>
			<Button text={CREATE_COURSE_BUTTON} onClick={onClick} />
		</div>
	);
}
