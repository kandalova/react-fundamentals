import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { mockedAuthorsList } from '../constants/MockedCourses';
import { IAuthor } from '../helpers/appTypes';

export const AuthorsContext = createContext<Array<IAuthor>>([]);
const localStorageKey = 'authors';

export async function getAuthors(): Promise<Array<IAuthor>> {
	const content = localStorage.getItem(localStorageKey);
	if (!content) {
		return mockedAuthorsList;
	}

	return JSON.parse(content);
}

export async function saveAuthors(
	newAuthor: Omit<IAuthor, 'id'>
): Promise<Array<IAuthor>> {
	const existingAuthors = await getAuthors();
	const id = uuidv4();

	const updatedAuthors = existingAuthors.concat({
		...newAuthor,
		id,
	});
	localStorage.setItem(localStorageKey, JSON.stringify(updatedAuthors));

	return updatedAuthors;
}
