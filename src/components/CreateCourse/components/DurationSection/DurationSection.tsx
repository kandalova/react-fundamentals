import React from 'react';

import { Input } from '../../../../common/Input/Input';
import { CREATE_COURSE } from '../../../../constants/constants';
import { formatDuration } from '../../../../helpers/getCourseDuration';

interface IDurationSection {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: number | undefined;
}

export function DurationSection({ onChange, value }: IDurationSection) {
	return (
		<div>
			<h1>{CREATE_COURSE.DURATION_HEADER}</h1>
			<Input
				id='add_author'
				labelText={CREATE_COURSE.DURATION_LABEL}
				type='number'
				value={value}
				onChange={onChange}
			/>
			<p>
				{CREATE_COURSE.DURATION_LABEL}: {formatDuration(value)}
			</p>
		</div>
	);
}
