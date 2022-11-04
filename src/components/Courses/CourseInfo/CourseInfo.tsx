import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AuthorsContext } from '../../../api/authors';
import { CoursesContext } from '../../../api/courses';
import { Button } from '../../../common/Button/Button';
import { COURSE_INFO } from '../../../constants/constants';
import { ICourse } from '../../../helpers/appTypes';
import { formatDate } from '../../../helpers/formatDateCreation';
import { formatDuration } from '../../../helpers/getCourseDuration';
import { getAuthorsArray } from '../../../helpers/getValuesByIDsString';
import { CourseProp } from '../components/CourseProp/CourseProp';

import classes from './courseInfo.module.scss';

export function CourseInfo() {
	const { id } = useParams<{ id: string }>();
	const courses = useContext(CoursesContext);
	const authors = useContext(AuthorsContext);
	const course: ICourse | undefined = courses.find(
		(course) => course.id === id
	);
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
							<CourseProp
								prop={COURSE_INFO.AUTHORS}
								value={getAuthorsArray(course.authors, authors)}
							/>
						</div>
					</div>
				</>
			) : (
				<div>Incorrect id provided</div>
			)}
		</div>
	);
}
