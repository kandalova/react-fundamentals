import React, { useState } from 'react';

import { Title } from './components/Title/Title';
import { Description } from '../../common/Description/Description';
import {
	AUTHORS_LIST_BUTTON,
	AUTHORS_LIST_HEADER,
	COURSE_AUTHORS_LIST_BUTTON,
	COURSE_AUTHORS_LIST_HEADER,
	CREATE_COURSE_DESCRIPTION_LABEL,
	NEW_COURSE_ALERT,
} from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import { AuthorListSection } from './components/AuthorsListSection/AuthorsListSection';

import classes from './creareCourse.module.scss';

interface ICreateCourse {
	authors: Array<any>;
	createAuthor: (value: string) => void;
	createCourse: (course: any) => void;
}

const initialCourseAuthors: Array<string> = [];

function prepareCourse(
	title: string,
	description: string,
	duration: number,
	courseAuthors: Array<string>
): any {
	const date = new Date().toLocaleString();
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
			title,
			description,
			duration,
			authors: courseAuthors,
			creationDate,
		};
	} else {
		alert(NEW_COURSE_ALERT);
		return null;
	}
}

export function CreateCourse({
	authors,
	createAuthor,
	createCourse,
}: ICreateCourse) {
	const [title, setTitle] = useState('');
	const [description, setDesc] = useState('');
	const [courseAuthors, setCourseAuthors] = useState(initialCourseAuthors);
	const [duration, setDuration] = useState(NaN);

	function onTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setTitle(event.target.value);
	}
	function onDescChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
		setDesc(event.target.value);
	}
	function addAuthorToCourse(id: string): void {
		setCourseAuthors([...courseAuthors, id]);
	}
	function deleteAuthorFromCourse(id: string): void {
		const newCourseAuthors = courseAuthors.filter((item) => item !== id);
		setCourseAuthors(newCourseAuthors);
	}
	function onDurationChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setDuration(event.target.valueAsNumber);
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
			<Title onClick={onCreateCourse} value={title} onChange={onTitleChange} />
			<Description
				value={description}
				labelText={CREATE_COURSE_DESCRIPTION_LABEL}
				id={'desc_text'}
				onChange={onDescChange}
			/>
			<div className={classes.boxes}>
				<div className={classes.box}>
					<AddAuthorSection onCreate={createAuthor} />
				</div>
				<div className={classes.box}>
					<AuthorListSection
						title={AUTHORS_LIST_HEADER}
						buttonText={AUTHORS_LIST_BUTTON}
						authors={availableAuthors}
						onClick={addAuthorToCourse}
					/>
				</div>
				<div className={classes.box}>
					<DurationSection onChange={onDurationChange} value={duration} />
				</div>
				<div className={classes.box}>
					<AuthorListSection
						title={COURSE_AUTHORS_LIST_HEADER}
						buttonText={COURSE_AUTHORS_LIST_BUTTON}
						authors={reservedAuthors}
						onClick={deleteAuthorFromCourse}
					/>
				</div>
			</div>
		</div>
	);
}
