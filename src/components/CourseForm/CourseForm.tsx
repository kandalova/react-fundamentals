import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addAuthor, getAuthors } from '../../api/authors';
import { authorAdded, authorsLoaded } from '../../store/authors/authorsActions';
import { Title } from './components/Title/Title';
import { TextArea } from '../../common/TextArea/TextArea';
import { CREATE_COURSE } from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import {
	IAuthor,
	IAuthorPayload,
	ICourse,
	ICoursePayload,
} from '../../helpers/appTypes';
import { getCourse } from '../../helpers/createCourseHelper';
import { addCourse } from '../../api/courses';
import { courseAdded } from '../../store/courses/coursesActions';
import { Authors } from './components/Authors/Authors';

import classes from './courseForm.module.scss';

const initialValues: ICoursePayload = {
	title: '',
	description: '',
	duration: '',
	authors: [],
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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getAuthors()
			.then((authors) => dispatch(authorsLoaded(authors)))
			.finally(() => {
				setLoading(false);
			});
	}, []);

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
		const newCourse = getCourse(values);
		addCourse(newCourse).then((course: ICourse) => {
			dispatch(courseAdded(course));
			resetForm();
			navigate('/courses');
		});
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
					{!loading && <Authors name='authors' />}
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
