import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE } from '../../../../constants/constants';

import classes from './title.module.scss';

interface ITitle {
	value: string;
	onCreateCourseClick: (event: React.MouseEvent<HTMLElement>) => void;
	onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Title({ value, onCreateCourseClick, onTitleChange }: ITitle) {
	return (
		<div className={classes.title}>
			<Input
				id='course_title'
				value={value}
				onChange={onTitleChange}
				labelText={CREATE_COURSE.TITLE}
			/>
			<Button text={CREATE_COURSE.BUTTON} onClick={onCreateCourseClick} />
		</div>
	);
}
