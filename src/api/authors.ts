import { ERRORS } from '../constants/constants';
import { IAuthor, IAuthorPayload } from '../helpers/appTypes';
import { getAuthHeaders, getHeaders } from './headers';

export async function getAuthors(): Promise<Array<IAuthor>> {
	const headers = getHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}authors/all`, {
		method: 'GET',
		headers,
	});
	const info = await response.json();
	if (response.ok && info.result) {
		return info.result as Array<IAuthor>;
	}
	throw new Error(ERRORS.AUTHORS);
}

export async function addAuthor(author: IAuthorPayload): Promise<IAuthor> {
	const headers = await getAuthHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}authors/add`, {
		method: 'POST',
		body: JSON.stringify(author),
		headers,
	});
	const info = await response.json();
	if (response.ok && info.result) {
		return info.result as IAuthor;
	}
	throw new Error(ERRORS.AUTHORS);
}
