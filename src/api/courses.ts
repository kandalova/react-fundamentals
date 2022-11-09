import { ERRORS } from '../constants/constants';

import { ICourse, INewCourse } from '../helpers/appTypes';
import { getAuthHeaders } from './headers';

export async function getCourses(): Promise<Array<ICourse>> {
	const headers = await getAuthHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}courses/all`, {
		method: 'GET',
		headers,
	});
	const info = await response.json();
	if (response.ok && info.result) {
		return info.result as Array<ICourse>;
	}
	throw new Error(ERRORS.COURSES);
}

export async function addCourse(course: INewCourse): Promise<ICourse> {
	const headers = await getAuthHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}courses/add`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers,
	});
	const info = await response.json();
	if (response.ok && info.result) {
		return info.result as ICourse;
	}
	throw new Error(ERRORS.COURSES);
}

export async function deleteCourse(id: string) {
	const headers = await getAuthHeaders();
	const response = await fetch(
		`${process.env.REACT_APP_API_URL}courses/${id}`,
		{
			method: 'DELETE',
			headers,
		}
	);
	if (!response.ok) {
		throw new Error(ERRORS.COURSES);
	}
}
