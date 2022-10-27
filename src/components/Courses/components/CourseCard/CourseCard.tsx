import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { COURSE_CARD } from '../../../../constants/constants';
import { IAuthor, ICourse } from '../../../../helpers/appTypes';
import { formatDate } from '../../../../helpers/formatDateCreation';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { getAuthorsString } from '../../../../helpers/getValuesByIDsString';
import { CourseProp } from '../CourseProp/CourseProp';

import classes from './courseCard.module.scss';

interface ICourseCard {
	course: ICourse;
	authors: Array<IAuthor>;
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
					value={getAuthorsString(course.authors, authors)}
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
