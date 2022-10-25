import React, { useState } from 'react';

import { Title } from './components/Title/Title';
import { Description } from '../../common/Description/Description';
import {
	CREATE_COURSE,
	CREATE_COURSE_AUTHORS,
	ERRORS,
} from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import { AuthorListSection } from './components/AuthorsListSection/AuthorsListSection';
import { IAuthor, ICourse } from '../../helpers/appTypes';

import classes from './creareCourse.module.scss';

interface ICreateCourse {
	authors: Array<IAuthor>;
	createAuthor: (value: string) => void;
	createCourse: (course: ICourse) => void;
}

const initialCourseAuthors: Array<string> = [];

function prepareCourse(
	title: string,
	description: string,
	duration: number | undefined,
	courseAuthors: Array<string>
): ICourse | null {
	if (
		title &&
		description &&
		description.length > 2 &&
		duration &&
		duration > 0 &&
		courseAuthors.length > 0
	) {
		const creationDate = new Date().toLocaleString();
		return {
			id: null,
			title,
			description,
			duration,
			authors: courseAuthors,
			creationDate,
		};
	} else {
		alert(ERRORS.NEW_COURSE);
		return null;
	}
}

export function CreateCourse({
	authors,
	createAuthor,
	createCourse,
}: ICreateCourse) {
	const [title, setTitle] = useState<string>('');
	const [description, setDesc] = useState<string>('');
	const [courseAuthors, setCourseAuthors] =
		useState<string[]>(initialCourseAuthors);
	const [duration, setDuration] = useState<number | undefined>();

	function deleteAuthorFromCourse(id: string): void {
		const newCourseAuthors = courseAuthors.filter((item) => item !== id);
		setCourseAuthors(newCourseAuthors);
	}
	function onCreateCourse(): void {
		const newCourse = prepareCourse(
			title,
			description,
			duration,
			courseAuthors
		);
		if (newCourse) createCourse(newCourse);
	}

	const availableAuthors = authors.filter((author) => {
		return !courseAuthors.includes(author.id);
	});

	const reservedAuthors = authors.filter((author) => {
		return courseAuthors.includes(author.id);
	});

	return (
		<div className={classes.createCourse}>
			<Title
				onCreateCourseClick={onCreateCourse}
				value={title}
				onTitleChange={(event) => setTitle(event.target.value)}
			/>
			<Description
				value={description}
				labelText={CREATE_COURSE.DESCRIPTION_LABEL}
				id={'desc_text'}
				onChange={(event) => setDesc(event.target.value)}
			/>
			<div className={classes.boxes}>
				<div className={classes.box}>
					<AddAuthorSection onCreate={createAuthor} />
				</div>
				<div className={classes.box}>
					<AuthorListSection
						title={CREATE_COURSE_AUTHORS.LIST}
						buttonText={CREATE_COURSE_AUTHORS.LIST_ADD}
						authors={availableAuthors}
						onClick={(id) => setCourseAuthors([...courseAuthors, id])}
					/>
				</div>
				<div className={classes.box}>
					<DurationSection
						onChange={(event) => setDuration(event.target.valueAsNumber)}
						value={duration}
					/>
				</div>
				<div className={classes.box}>
					<AuthorListSection
						title={CREATE_COURSE_AUTHORS.COURSE_LIST}
						buttonText={CREATE_COURSE_AUTHORS.COURSE_LIST_DELETE}
						authors={reservedAuthors}
						onClick={deleteAuthorFromCourse}
					/>
				</div>
			</div>
		</div>
	);
}
