import { useFormikContext, Form } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextArea } from '../../../../common/TextArea/TextArea';
import { CREATE_COURSE } from '../../../../constants/constants';
import { authorsWithCourseIsLoaded } from '../../../../store/authors/authorsSelector';
import { getAuthorsWithCourse } from '../../../../store/authors/authorsThunks';
import { AppDispatch } from '../../../../store/user/userThunks';

import classes from '../../courseForm.module.scss';
import { Authors } from '../Authors/Authors';
import { DurationSection } from '../DurationSection/DurationSection';
import { Title } from '../Title/Title';

export function FormContent() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { setValues } = useFormikContext();
	const isLoaded = useSelector(authorsWithCourseIsLoaded);

	useEffect(() => {
		dispatch(getAuthorsWithCourse(id || '', setValues));
	}, []);

	return (
		<>
			{isLoaded && (
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
