import { useFormikContext, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthors } from '../../../../api/authors';
import { getCourseByID } from '../../../../api/courses';
import { TextArea } from '../../../../common/TextArea/TextArea';
import { CREATE_COURSE } from '../../../../constants/constants';
import { ICourse } from '../../../../helpers/appTypes';
import { authorsLoaded } from '../../../../store/authors/authorsActions';

import classes from '../../courseForm.module.scss';
import { Authors } from '../Authors/Authors';
import { DurationSection } from '../DurationSection/DurationSection';
import { Title } from '../Title/Title';

export function FormContent() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { setValues } = useFormikContext();

	function setCourseValues({
		title,
		authors,
		description,
		duration,
		creationDate,
	}: ICourse) {
		setValues({
			title,
			authors,
			description,
			duration,
			creationDate,
		});
	}

	useEffect(() => {
		setLoading(true);

		Promise.all([getAuthors(), id ? getCourseByID(id) : null])
			.then(([authors, course]) => {
				dispatch(authorsLoaded(authors));
				id && course && setCourseValues(course);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			{!loading && (
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
					<Authors name='authors' />
				</Form>
			)}
		</>
	);
}
