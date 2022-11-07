import React from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import {
	IAuthor,
	IAuthorPayload,
	ICourse,
	ICoursePayload,
} from '../../helpers/appTypes';
import { getValidatedData } from '../../helpers/createCourseHelper';
import { addCourse } from '../../api/courses';
import { courseAdded } from '../../store/courses/coursesActions';

import classes from './creareCourse.module.scss';
import { Authors } from './components/Authors/Authors';

const initialValues: ICoursePayload = {
	title: '',
	description: '',
	duration: '',
	courseAuthors: [],
};

const validationSchema = yup.object({
	title: yup.string().min(2).required(),
	description: yup.string().min(2).required(),
	duration: yup.number().min(1).required().positive().integer(),
	courseAuthors: yup.array().of(yup.string()).min(1),
});

const authorInitialValues: IAuthorPayload = {
	name: '',
};

const authorValidationSchema = yup.object({
	name: yup.string().min(2).required(),
});

export function CreateCourse() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		const newCourse = getValidatedData(values);
		if (newCourse) {
			addCourse(newCourse).then((course: ICourse) => {
				dispatch(courseAdded(course));
				resetForm();
				navigate('/courses');
			});
		}
	}

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
					<Authors name='courseAuthors' />
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
