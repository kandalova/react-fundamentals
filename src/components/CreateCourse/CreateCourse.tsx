import React, { useContext, useMemo, useState } from 'react';

import { Title } from './components/Title/Title';
import { Description } from '../../common/Description/Description';
import {
	CREATE_COURSE,
	CREATE_COURSE_AUTHORS,
} from '../../constants/constants';
import { AddAuthorSection } from './components/AddAuthorSection/AddAuthorSection';
import { DurationSection } from './components/DurationSection/DurationSection';
import { AuthorListSection } from './components/AuthorsListSection/AuthorsListSection';
import { IAuthor, ICourse } from '../../helpers/appTypes';
import { AuthorsContext } from '../../api/authors';
import { getValidatedData } from '../../helpers/createCourseHelper';

import classes from './creareCourse.module.scss';

interface ICreateCourse {
	createAuthor: (author: Omit<IAuthor, 'id'>) => void;
	createCourse: (course: Omit<ICourse, 'id'>) => void;
}

export function CreateCourse({ createAuthor, createCourse }: ICreateCourse) {
	const [title, setTitle] = useState<string>('');
	const [description, setDesc] = useState<string>('');
	const [courseAuthors, setCourseAuthors] = useState<string[]>([]);
	const [duration, setDuration] = useState<number | string>('');
	const authors = useContext(AuthorsContext);

	function deleteAuthorFromCourse(id: string): void {
		const newCourseAuthors = courseAuthors.filter((item) => item !== id);
		setCourseAuthors(newCourseAuthors);
	}
	function onCreateCourse(): void {
		const newCourse = getValidatedData({
			title,
			description,
			duration,
			courseAuthors,
		});
		if (newCourse) createCourse(newCourse);
	}

	function getAvailableList(ids: string[]): Array<IAuthor> {
		return authors.filter((author) => {
			return !ids.includes(author.id);
		});
	}

	function getReservedList(ids: string[]): Array<IAuthor> {
		return authors.filter((author) => {
			return ids.includes(author.id);
		});
	}

	const memoizedAvailableAuthors = useMemo(
		() => getAvailableList(courseAuthors),
		[courseAuthors, authors]
	);

	const memoizedReservedAuthors = useMemo(
		() => getReservedList(courseAuthors),
		[courseAuthors, authors]
	);

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
						authors={memoizedAvailableAuthors}
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
						authors={memoizedReservedAuthors}
						onClick={deleteAuthorFromCourse}
					/>
				</div>
			</div>
		</div>
	);
}
