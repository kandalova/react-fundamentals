import { StoreState } from '../rootReducer';

export const selectAuthors = (state: StoreState) => state.authors.authors;

export const selectAuthorsById =
	(selectedIds: Array<string>) => (store: StoreState) => {
		return store.authors.authors.filter((author) =>
			selectedIds.includes(author.id)
		);
	};

export const selectAuthorNamesStringById =
	(selectedIds: Array<string>) => (store: StoreState) => {
		return store.authors.authors
			.filter((author) => selectedIds.includes(author.id))
			.map((author) => author.name)
			.join(', ');
	};

export const authorsWithCourseIsLoaded = (store: StoreState) => {
	return store.authors.isAuthorsWithCourseLoaded;
};
