import { useField } from 'formik';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CREATE_COURSE_AUTHORS } from '../../../../constants/constants';
import { selectAuthors } from '../../../../store/authors/authorsSelector';
import { AuthorListSection } from '../AuthorsListSection/AuthorsListSection';

import classes from '../../courseForm.module.scss';

interface IAuthorsProps {
	name: string;
}

export function Authors({ name }: IAuthorsProps) {
	const authorsList = useSelector(selectAuthors);
	const [{ value, onChange }, meta] = useField<Array<string>>(name);
	const hasError = meta.touched && meta.error;

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
					authorList={authorsList}
					onClick={onCourseAuthorAdd}
				/>
			</div>
			<div className={classes.box}>
				<AuthorListSection
					value={value}
					title={CREATE_COURSE_AUTHORS.COURSE_LIST}
					buttonText={CREATE_COURSE_AUTHORS.COURSE_LIST_DELETE}
					authorList={authorsList}
					onClick={onCourseAuthorRemove}
				/>
				<div className={hasError ? classes.show : classes.hide}>
					{meta.error}
				</div>
			</div>
		</div>
	);
}
