import { v4 as uuidv4 } from 'uuid';

import { ERRORS } from '../constants/constants';
import { mockedAuthorsList } from '../constants/MockedCourses';
import { IAuthor, IAuthorPayload } from '../helpers/appTypes';

// export const AuthorsContext = createContext<Array<IAuthor>>([]);
const localStorageKey = 'authors';

export async function getAuthorsOld(): Promise<Array<IAuthor>> {
	const content = localStorage.getItem(localStorageKey);
	if (!content) {
		return mockedAuthorsList;
	}

	return JSON.parse(content);
}

export async function getAuthors(): Promise<Array<IAuthor>> {
	const response = await fetch(process.env.REACT_APP_API_KEY + 'authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const info = await response.json();
	console.log(info);
	if (response.ok && info.result) {
		return info.result as Array<IAuthor>;
	}
	throw new Error(ERRORS.AUTHORS);
}

export async function addAuthor(author: IAuthorPayload): Promise<IAuthor> {
	const id = await uuidv4();
	return { ...author, id };
	// const response = await fetch(process.env.REACT_APP_API_KEY + 'authors/add', {
	// 	method: 'POST',
	// 	body: JSON.stringify(author),
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// });
	// const info = await response.json();
	// console.log(info);
	// if (response.ok && info.result) {
	// 	return info.result as IAuthor;
	// }
	// throw new Error(ERRORS.AUTHORS);
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
