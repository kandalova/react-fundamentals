import React from 'react';
import { IAuthor } from '../../../../helpers/appTypes';
import classes from './courseProp.module.scss';

interface ICourseProp {
	prop: string;
	value: string | Array<IAuthor>;
}

export function CourseProp({ prop, value }: ICourseProp) {
	const isString = typeof value === 'string';
	return (
		<div className={classes.courseProp}>
			<span>
				<b>{prop}:</b> {isString ? ' ' : <br />}
				{isString
					? value
					: value.map((item: IAuthor) => <p key={item.id}>{item.name}</p>)}
			</span>
		</div>
	);
}
