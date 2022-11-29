import React from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE } from '../../../../constants/constants';

import classes from './title.module.scss';

export function Title({ ...prop }) {
	const { id } = useParams<{ id: string }>();
	return (
		<div className={classes.title}>
			<Input id='course_title' labelText={CREATE_COURSE.TITLE} {...prop} />
			<Button text={id ? CREATE_COURSE.BUTTON_UPDATE : CREATE_COURSE.BUTTON} />
		</div>
	);
}
