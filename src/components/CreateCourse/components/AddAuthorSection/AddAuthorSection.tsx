import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE_AUTHORS, ERRORS } from '../../../../constants/constants';

import classes from './../../creareCourse.module.scss';

interface IAddAuthorSection {
	onCreate: (value: string) => void;
}

export function AddAuthorSection({ onCreate }: IAddAuthorSection) {
	const [value, setValue] = useState<string>('');

	function onClick(): void {
		if (value && value.length > 2) {
			onCreate(value);
			setValue('');
		} else {
			alert(ERRORS.NEW_AUTHOR);
		}
	}

	return (
		<div>
			<h1>{CREATE_COURSE_AUTHORS.ADD}</h1>
			<Input
				id='add_author'
				labelText={CREATE_COURSE_AUTHORS.NAME}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<div className={classes.center}>
				<Button text={CREATE_COURSE_AUTHORS.CREATE} onClick={onClick} />
			</div>
		</div>
	);
}
