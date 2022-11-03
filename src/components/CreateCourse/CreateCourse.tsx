import React, { useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';

import { Title } from './components/Title/Title';
import { TeaxtArea } from '../../common/TextArea/TextArea';
import {
	CREATE_COURSE,
	CREATE_COURSE_AUTHORS,
} from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import { AuthorListSection } from './components/AuthorsListSection/AuthorsListSection';
import { IAuthor, ICourse } from '../../helpers/appTypes';
import { AuthorsContext } from '../../api/authors';
import {
	getAvailableList,
	getReservedList,
	getValidatedData,
} from '../../helpers/createCourseHelper';

import classes from './creareCourse.module.scss';

interface ICreateCourse {
	createAuthor: (author: Omit<IAuthor, 'id'>) => void;
	createCourse: (course: Omit<ICourse, 'id'>) => void;
}

export interface ICreateCoursePayload {
	title: string;
	description: string;
	duration: string | number;
}

const initialValues: ICreateCoursePayload = {
	title: '',
	description: '',
	duration: '',
};

const validationSchema = yup.object({
	title: yup.string().min(2).required(),
	description: yup.string().min(2).required(),
	duration: yup.number().min(1).required().positive().integer(),
});

interface IAuthorPayload {
	name: string;
}

const authorInitialValues: IAuthorPayload = {
	name: '',
};

const authorValidationSchema = yup.object({
	name: yup.string().min(2).required(),
});

export function CreateCourse({ createAuthor, createCourse }: ICreateCourse) {
	const [courseAuthors, setCourseAuthors] = useState<string[]>([]);
	const authors = useContext(AuthorsContext);

	function deleteAuthorFromCourse(id: string): void {
		const newCourseAuthors = courseAuthors.filter((item) => item !== id);
		setCourseAuthors(newCourseAuthors);
	}

	function onCreateCourseSubmit({
		title,
		description,
		duration,
	}: ICreateCoursePayload) {
		console.log('parent');
		const newCourse = getValidatedData({
			title,
			description,
			duration,
			courseAuthors,
		});
		if (newCourse) createCourse(newCourse);
	}

	const memoizedAvailableAuthors = useMemo(
		() => getAvailableList(courseAuthors, authors),
		[courseAuthors, authors]
	);

	const memoizedReservedAuthors = useMemo(
		() => getReservedList(courseAuthors, authors),
		[courseAuthors, authors]
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
						<TeaxtArea
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
				onSubmit={createAuthor}
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
