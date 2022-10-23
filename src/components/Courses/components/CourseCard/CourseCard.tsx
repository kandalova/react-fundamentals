import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { formatDate } from '../../../../helpers/formatDateCreation';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { CourseProp } from '../CourseProp/CourseProp';

import classes from './courseCard.module.scss';

interface ICourseCard {
	course: {
		id: string;
		title: string;
		description: string;
		creationDate: string;
		duration: number;
		authors: Array<string>;
	};
	authors: Array<{
		id: string;
		name: string;
	}>;
}

export function CourseCard({ course, authors }: ICourseCard) {
	function getAuthors(authorIDs: Array<string>): string {
		const authorsNames = authorIDs.map((id) => {
			const author = authors.find((item) => item.id === id);
			return author ? author.name : '';
		});
		return authorsNames.filter(Boolean).join(', ');
	}

	return (
		<div className={classes.card}>
			<div className={classes.leftInfo}>
				<h3>{course.title}</h3>
				<p>{course.description}</p>
			</div>
			<div className={classes.rightInfo}>
				<CourseProp prop='Authors' value={getAuthors(course.authors)} />
				<CourseProp prop='Duration' value={formatDuration(course.duration)} />
				<CourseProp
					prop='Created'
					value={formatDate(course.creationDate, '.')}
				/>
				<Button text='Show course' />
			</div>
		</div>
	);
}
