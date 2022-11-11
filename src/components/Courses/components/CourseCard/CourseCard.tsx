import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { Button } from '../../../../common/Button/Button';
import { COURSE_CARD } from '../../../../constants/constants';
import { ICourse } from '../../../../helpers/appTypes';
import { formatDate } from '../../../../helpers/formatDateCreation';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { selectAuthorNamesStringById } from '../../../../store/authors/authorsSelector';
import { CourseProp } from '../CourseProp/CourseProp';

import classes from './courseCard.module.scss';
import { courseDeleted } from '../../../../store/courses/coursesActions';
import { deleteCourse } from '../../../../api/courses';

interface ICourseCard {
	course: ICourse;
}

export function CourseCard({ course }: ICourseCard) {
	const authors = useSelector(
		selectAuthorNamesStringById(course?.authors || [])
	);
	const dispatch = useDispatch();

	function onDeleteCourseSubmit(id: string) {
		deleteCourse(id).then(() => {
			dispatch(courseDeleted(id));
		});
	}

	return (
		<div className={classes.card}>
			<div className={classes.leftInfo}>
				<h3>{course.title}</h3>
				<p>{course.description}</p>
			</div>
			<div className={classes.rightInfo}>
				<CourseProp prop={COURSE_CARD.AUTHORS} value={authors} />
				<CourseProp
					prop={COURSE_CARD.DURATION}
					value={formatDuration(course.duration)}
				/>
				<CourseProp
					prop={COURSE_CARD.CREATED}
					value={formatDate(course.creationDate, '.')}
				/>
				<div className={classes.buttonBar}>
					<Link to={`/courses/${course.id}`}>
						<Button text={COURSE_CARD.BUTTON} />
					</Link>
					<div className={classes.icon}>
						<AiFillEdit />
					</div>
					<div
						className={classes.icon}
						onClick={() => onDeleteCourseSubmit(course.id)}
					>
						<AiFillDelete />
					</div>
				</div>
			</div>
		</div>
	);
}
