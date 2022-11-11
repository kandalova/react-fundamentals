import { StoreState } from '../rootReducer';

export const selectAuthors = (state: StoreState) => state.authors;

export const selectAuthorsById =
	(selectedIds: Array<string>) => (store: StoreState) => {
		return store.authors.filter((author) => selectedIds.includes(author.id));
	};

export const selectAuthorNamesStringById =
	(selectedIds: Array<string>) => (store: StoreState) => {
		return store.authors
			.filter((author) => selectedIds.includes(author.id))
			.map((author) => author.name)
			.join(', ');
	};
