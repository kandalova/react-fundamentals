import { useField } from 'formik';
import React from 'react';
import classes from './input.module.scss';

interface IInput {
	id: string;
	placeholder?: string;
	labelText?: string;
	type?: string;
	value?: any;
}

export function Input({ id, labelText, ...props }: IInput) {
	const [field, meta] = useField(id);
	const hasError = meta.touched && meta.error;
	return (
		<div className={classes.inputParent}>
			<label htmlFor={id}>{labelText}</label>
			<input
				className={hasError ? classes.inputError : ''}
				id={id}
				{...field}
				name={id}
				{...props}
			/>
			<div className={classes.error}>
				<span className={hasError ? classes.show : classes.hide}>
					{meta.error}
				</span>
			</div>
		</div>
	);
}
