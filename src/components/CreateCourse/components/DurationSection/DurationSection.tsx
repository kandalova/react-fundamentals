import { useField, useFormikContext } from 'formik';
import React from 'react';

import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE } from '../../../../constants/constants';
import { formatDuration } from '../../../../helpers/getCourseDuration';

interface IDurationSection {
	id: string;
}

export function DurationSection({ id }: IDurationSection) {
	const [field] = useField(id);
	return (
		<div>
			<h1>{CREATE_COURSE.DURATION_HEADER}</h1>
			<Input id={id} labelText={CREATE_COURSE.DURATION_LABEL} type='number' />
			<p>
				{CREATE_COURSE.DURATION_LABEL}: {formatDuration(field.value)}
			</p>
		</div>
	);
}
