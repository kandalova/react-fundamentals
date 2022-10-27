import React from 'react';
import classes from './description.module.scss';

interface IDescription {
	id: string;
	labelText?: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string;
}

export function Description({ id, value, labelText, onChange }: IDescription) {
	return (
		<div className={classes.inputParent}>
			<label htmlFor={id}>{labelText}</label>
			<textarea id={id} value={value} onChange={onChange} />
		</div>
	);
}
