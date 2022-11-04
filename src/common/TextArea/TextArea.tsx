import { useField } from 'formik';
import React from 'react';
import classes from './textArea.module.scss';

interface ITextArea {
	id: string;
	labelText?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string;
}

export function TextArea({ id, labelText }: ITextArea) {
	const [field, meta] = useField(id);
	const hasError = meta.touched && meta.error;
	return (
		<div className={classes.inputParent}>
			<label htmlFor={id}>{labelText}</label>
			<textarea
				id={id}
				{...field}
				className={hasError ? classes.inputError : ''}
			/>
			<div className={classes.error}>
				<span className={hasError ? classes.show : classes.hide}>
					{meta.error}
				</span>
			</div>
		</div>
	);
}
