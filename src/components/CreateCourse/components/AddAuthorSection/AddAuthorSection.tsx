import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import {
	ADD_AUTHOR_BUTTON,
	ADD_AUTHOR_HEADER,
	ADD_AUTHOR_LABEL,
	NEW_AUTHOR_ALERT,
} from '../../../../constants/constants';

import classes from './../../creareCourse.module.scss';

interface IAddAuthorSection {
	onCreate: (value: string) => void;
}

export function AddAuthorSection({ onCreate }: IAddAuthorSection) {
	const [value, setValue] = useState('');

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setValue(event.target.value);
	}
	function onClick(): void {
		if (value && value.length > 2) {
			onCreate(value);
			setValue('');
		} else {
			alert(NEW_AUTHOR_ALERT);
		}
	}

	return (
		<div>
			<h1>{ADD_AUTHOR_HEADER}</h1>
			<Input
				id='add_author'
				labelText={ADD_AUTHOR_LABEL}
				value={value}
				onChange={onChange}
			/>
			<div className={classes.center}>
				<Button text={ADD_AUTHOR_BUTTON} onClick={onClick} />
			</div>
		</div>
	);
}
