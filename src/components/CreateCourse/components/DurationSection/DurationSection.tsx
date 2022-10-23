import React from 'react';

import { Input } from '../../../../common/Input/Input';
import {
	DURATION_COURSE_HEADER,
	DURATION_COURSE_LABEL,
} from '../../../../constants/constants';
import { formatDuration } from '../../../../helpers/getCourseDuration';

interface IDurationSection {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: number;
}

export function DurationSection({ onChange, value }: IDurationSection) {
	return (
		<div>
			<h1>{DURATION_COURSE_HEADER}</h1>
			<Input
				id='add_author'
				labelText={DURATION_COURSE_LABEL}
				type='number'
				value={value}
				onChange={onChange}
			/>
			<p>
				{DURATION_COURSE_LABEL}: {formatDuration(value)}
			</p>
		</div>
	);
}
