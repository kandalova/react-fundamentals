import React, { useMemo, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAuthors } from '../../store/authors/authorsSelector';
import { addAuthor } from '../../api/authors';
import { authorAdded } from '../../store/authors/authorsActions';
import { Title } from './components/Title/Title';
import { TextArea } from '../../common/TextArea/TextArea';
import {
	CREATE_COURSE,
	CREATE_COURSE_AUTHORS,
} from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import { AuthorListSection } from './components/AuthorsListSection/AuthorsListSection';
import {
	IAuthor,
	IAuthorPayload,
	ICourse,
	ICoursePayload,
} from '../../helpers/appTypes';
import {
	getAvailableList,
	getReservedList,
	getValidatedData,
} from '../../helpers/createCourseHelper';
import { addCourse } from '../../api/courses';
import { courseAdded } from '../../store/courses/coursesActions';

import classes from './creareCourse.module.scss';

const initialValues: ICoursePayload = {
	title: '',
	description: '',
	duration: '',
	// authors: [],
};

const validationSchema = yup.object({
	title: yup.string().min(2).required(),
	description: yup.string().min(2).required(),
	duration: yup.number().min(1).required().positive().integer(),
	// authors: yup.array().of(yup.string()).min(1),
});

const authorInitialValues: IAuthorPayload = {
	name: '',
};

const authorValidationSchema = yup.object({
	name: yup.string().min(2).required(),
});

export function CreateCourse() {
	const [courseAuthors, setCourseAuthors] = useState<string[]>([]);
	const authorsList = useSelector(selectAuthors);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function deleteAuthorFromCourse(id: string): void {
		const newCourseAuthors = courseAuthors.filter((item) => item !== id);
		setCourseAuthors(newCourseAuthors);
	}

	function onCreateAuthorSubmit(
		values: IAuthorPayload,
		{ resetForm }: FormikHelpers<IAuthorPayload>
	) {
		addAuthor(values).then((author: IAuthor) => {
			dispatch(authorAdded(author));
			resetForm();
		});
	}

	function onCreateCourseSubmit(
		values: ICoursePayload,
		{ resetForm }: FormikHelpers<ICoursePayload>
	) {
		const newCourse = getValidatedData(values, courseAuthors);
		if (newCourse) {
			addCourse(newCourse).then((course: ICourse) => {
				dispatch(courseAdded(course));
				resetForm();
				navigate('/courses');
			});
		}
	}

	const memoizedAvailableAuthors = useMemo(
		() => getAvailableList(courseAuthors, authorsList),
		[courseAuthors, authorsList]
	);

	const memoizedReservedAuthors = useMemo(
		() => getReservedList(courseAuthors, authorsList),
		[courseAuthors, authorsList]
	);

	return (
		<div className={classes.createCourse}>
			<Formik
				initialValues={initialValues}
				onSubmit={onCreateCourseSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<div>
						<Title id='title' />
						<TextArea
							labelText={CREATE_COURSE.DESCRIPTION_LABEL}
							id='description'
						/>
					</div>
					<div className={classes.boxes}>
						<div className={classes.box}>
							<DurationSection id='duration' />
						</div>
					</div>
					<div className={classes.boxes}>
						<div className={classes.box}>
							<AuthorListSection
								title={CREATE_COURSE_AUTHORS.LIST}
								buttonText={CREATE_COURSE_AUTHORS.LIST_ADD}
								authors={memoizedAvailableAuthors}
								onClick={(id) => setCourseAuthors([...courseAuthors, id])}
							/>
						</div>
						<div className={classes.box}>
							<AuthorListSection
								title={CREATE_COURSE_AUTHORS.COURSE_LIST}
								buttonText={CREATE_COURSE_AUTHORS.COURSE_LIST_DELETE}
								authors={memoizedReservedAuthors}
								onClick={deleteAuthorFromCourse}
							/>
						</div>
					</div>
				</Form>
			</Formik>
			<Formik
				initialValues={authorInitialValues}
				onSubmit={onCreateAuthorSubmit}
				validationSchema={authorValidationSchema}
			>
				<Form>
					<div className={classes.boxes}>
						<div className={classes.box}>
							<AddAuthorSection />
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
