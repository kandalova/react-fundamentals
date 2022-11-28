import React from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addAuthor } from '../../api/authors';
import { authorAdded } from '../../store/authors/authorsActions';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import {
	IAuthor,
	IAuthorPayload,
	ICoursePayload,
} from '../../helpers/appTypes';

import classes from './courseForm.module.scss';
import { FormContent } from './components/FormContent/FormContent';
import { submitCourse } from '../../store/courses/coursesThunks';
import { AppDispatch } from '../../store/user/userThunks';

const initialValues: ICoursePayload = {
	title: '',
	description: '',
	duration: '',
	authors: [],
	creationDate: '',
};

const validationSchema = yup.object({
	title: yup.string().min(2).required(),
	description: yup.string().min(2).required(),
	duration: yup.number().min(1).required().positive().integer(),
	authors: yup.array().of(yup.string()).min(1),
});

const authorInitialValues: IAuthorPayload = {
	name: '',
};

const authorValidationSchema = yup.object({
	name: yup.string().min(2).required(),
});

export function CourseForm() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();

	function onCreateAuthorSubmit(
		values: IAuthorPayload,
		{ resetForm }: FormikHelpers<IAuthorPayload>
	) {
		addAuthor(values).then((author: IAuthor) => {
			dispatch(authorAdded(author));
			resetForm();
		});
	}

	function onCreateCourseSubmit(values: ICoursePayload) {
		dispatch(submitCourse(values, id || ''));
	}

	return (
		<div className={classes.createCourse}>
			<Formik
				initialValues={initialValues}
				onSubmit={onCreateCourseSubmit}
				validationSchema={validationSchema}
			>
				<FormContent />
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
