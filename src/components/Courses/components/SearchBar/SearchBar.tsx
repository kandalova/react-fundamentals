import { Form, Formik } from 'formik';
import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { SEARCH } from '../../../../constants/constants';

import classes from './searchBar.module.scss';

interface ISearch {
	onSearch: ({ search }: ISearchPayload) => void;
}

export interface ISearchPayload {
	search: string;
}

const initialValues: ISearchPayload = {
	search: '',
};

export function SearchBar({ onSearch }: ISearch) {
	return (
		<div className={classes.searchBar}>
			<Formik initialValues={initialValues} onSubmit={onSearch}>
				<Form className={classes.form}>
					<Input id='search' placeholder={SEARCH.PLACEHOLDER} />
					<Button text={SEARCH.BUTTON} />
				</Form>
			</Formik>
		</div>
	);
}
