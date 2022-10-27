import React from 'react';
import classes from '../CourseCard/courseCard.module.scss';

interface ICourseProp {
	prop: string;
	value: string;
}

export function CourseProp({ prop, value }: ICourseProp) {
	return (
		<p className={classes.courseProp}>
			<span>
				<b>{prop}:</b> {value}
			</span>
		</p>
	);
}
