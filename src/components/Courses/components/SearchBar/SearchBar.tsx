import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { SEARCH } from '../../../../constants/constants';

import classes from './searchBar.module.scss';

interface ISearchBar {
	onSearch?: (a: string) => void;
}

export function SearchBar({ onSearch }: ISearchBar) {
	const [value, setValue] = useState<string>('');

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
				onChange={(event) => setValue(event.target.value)}
				onKeyDown={onKeyDown}
				placeholderText={SEARCH.PLACEHOLDER}
			/>
			<Button
				text={SEARCH.BUTTON}
				onClick={() => onSearch && onSearch(value)}
			/>
		</div>
	);
}
