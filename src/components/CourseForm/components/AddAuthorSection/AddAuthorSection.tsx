import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE_AUTHORS } from '../../../../constants/constants';

import classes from './../../courseForm.module.scss';

export function AddAuthorSection() {
	return (
		<div>
			<h1>{CREATE_COURSE_AUTHORS.ADD}</h1>
			<Input id='name' labelText={CREATE_COURSE_AUTHORS.NAME} />
			<div className={classes.center}>
				<Button text={CREATE_COURSE_AUTHORS.CREATE} />
			</div>
		</div>
	);
}
