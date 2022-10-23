import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';

import classes from './searchBar.module.scss';

interface ISearchBar {
	onSearch?: (a: string) => void;
}

export function SearchBar({ onSearch }: ISearchBar) {
	const [value, setValue] = useState('');

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setValue(event.target.value);
	}
	function onKeyDown(event: React.KeyboardEvent): void {
		if (event.key === 'Enter' && onSearch) {
			onSearch(value);
		}
	}

	return (
		<div className={classes.searchBar}>
			<Input
				id='search_bar_input'
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<Button text='Search' onClick={() => onSearch && onSearch(value)} />
		</div>
	);
}
