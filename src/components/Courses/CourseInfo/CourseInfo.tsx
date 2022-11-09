import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../../common/Button/Button';
import { COURSE_INFO } from '../../../constants/constants';
import { formatDate } from '../../../helpers/formatDateCreation';
import { formatDuration } from '../../../helpers/getCourseDuration';
import { selectAuthorsById } from '../../../store/authors/authorsSelector';
import { selectCourseById } from '../../../store/courses/coursesSelector';
import { CourseProp } from '../components/CourseProp/CourseProp';

import classes from './courseInfo.module.scss';

export function CourseInfo() {
	const { id } = useParams<{ id: string }>();
	const course = useSelector(selectCourseById(id || ''));
	const authors = course ? useSelector(selectAuthorsById(course.authors)) : [];
	return (
		<div className={classes.container}>
			<Link to='/courses'>
				<Button text={COURSE_INFO.BACK}></Button>
			</Link>
			{course ? (
				<>
					<h1>{course.title}</h1>
					<div className={classes.content}>
						<div className={classes.firstChild}>{course.description}</div>
						<div className={classes.secondChild}>
							<CourseProp prop={COURSE_INFO.ID} value={course.id} />
							<CourseProp
								prop={COURSE_INFO.DURATION}
								value={formatDuration(course.duration)}
							/>
							<CourseProp
								prop={COURSE_INFO.CREATED}
								value={formatDate(course.creationDate, '/')}
							/>
							<CourseProp prop={COURSE_INFO.AUTHORS} value={authors} />
						</div>
					</div>
				</>
			) : (
				<div>Incorrect id provided</div>
			)}
		</div>
	);
}
