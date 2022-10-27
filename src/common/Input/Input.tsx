import React from 'react';
import classes from './input.module.scss';

interface IInput {
	id: string;
	placeholderText?: string;
	labelText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
	value?: string | number;
	type?: string;
}

export function Input({
	id,
	value,
	placeholderText,
	labelText,
	onChange,
	onKeyDown,
	type,
}: IInput) {
	return (
		<div className={classes.inputParent}>
			<label htmlFor={id}>{labelText}</label>
			<input
				id={id}
				value={value}
				type={type ? type : 'text'}
				placeholder={placeholderText}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
}
