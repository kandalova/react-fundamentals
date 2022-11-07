import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthors } from '../../../../store/authors/authorsSelector';
import classes from '../../creareCourse.module.scss';
import { AuthorListSection } from '../AuthorsListSection/AuthorsListSection';
import { CREATE_COURSE_AUTHORS } from '../../../../constants/constants';
import { useField } from 'formik';

interface IAuthorsProps {
	name: string;
}

export function Authors({ name }: IAuthorsProps) {
	const authorsList = useSelector(selectAuthors);
	const [{ value, onChange }] = useField<Array<string>>(name);

	const onCourseAuthorAdd = (updatedId: string) => {
		onChange({
			target: {
				name: name,
				value: value.concat(updatedId),
			},
		});
	};

	const onCourseAuthorRemove = (removedId: string) => {
		onChange({
			target: {
				name: name,
				value: value.filter((id) => removedId !== id),
			},
		});
	};

	const availableAuthors = useMemo(() => {
		return authorsList.map(({ id }) => id).filter((id) => !value.includes(id));
	}, [value, authorsList]);

	return (
		<div className={classes.boxes}>
			<div className={classes.box}>
				<AuthorListSection
					value={availableAuthors}
					title={CREATE_COURSE_AUTHORS.LIST}
					buttonText={CREATE_COURSE_AUTHORS.LIST_ADD}
					availableAuthors={authorsList}
					onClick={onCourseAuthorAdd}
				/>
			</div>
			<div className={classes.box}>
				<AuthorListSection
					value={value}
					title={CREATE_COURSE_AUTHORS.COURSE_LIST}
					buttonText={CREATE_COURSE_AUTHORS.COURSE_LIST_DELETE}
					availableAuthors={authorsList}
					onClick={onCourseAuthorRemove}
				/>
			</div>
		</div>
	);
}
