import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE } from '../../../../constants/constants';

import classes from './title.module.scss';

export function Title({ ...prop }) {
	return (
		<div className={classes.title}>
			<Input id='course_title' labelText={CREATE_COURSE.TITLE} {...prop} />
			<Button text={CREATE_COURSE.BUTTON} />
		</div>
	);
}
