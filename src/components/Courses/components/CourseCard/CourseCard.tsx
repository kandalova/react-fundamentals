import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { COURSE_CARD } from '../../../../constants/constants';
import { formatDate } from '../../../../helpers/formatDateCreation';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { getValuesByIDsString } from '../../../../helpers/getValuesByIDsString';
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
	return (
		<div className={classes.card}>
			<div className={classes.leftInfo}>
				<h3>{course.title}</h3>
				<p>{course.description}</p>
			</div>
			<div className={classes.rightInfo}>
				<CourseProp
					prop={COURSE_CARD.AUTHORS}
					value={getValuesByIDsString(course.authors, 'name', authors)}
				/>
				<CourseProp
					prop={COURSE_CARD.DURATION}
					value={formatDuration(course.duration)}
				/>
				<CourseProp
					prop={COURSE_CARD.CREATED}
					value={formatDate(course.creationDate, '.')}
				/>
				<Button text={COURSE_CARD.BUTTON} />
			</div>
		</div>
	);
}
