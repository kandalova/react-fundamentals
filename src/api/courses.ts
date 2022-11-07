import { v4 as uuidv4 } from 'uuid';
import { ERRORS } from '../constants/constants';

import { mockedCoursesList } from '../constants/MockedCourses';
import { ICourse, INewCourse } from '../helpers/appTypes';
import { getAuthHeaders, getToken } from './user';

// export const CoursesContext = createContext<Array<ICourse>>([]);
const localStorageKey = 'courses';

export async function getCoursesOld(): Promise<Array<ICourse>> {
	const content = localStorage.getItem(localStorageKey);
	if (!content) {
		return mockedCoursesList;
	}

	return JSON.parse(content);
}

export async function getCourses(): Promise<Array<ICourse>> {
	const headers = await getAuthHeaders();
	const response = await fetch(process.env.REACT_APP_API_KEY + 'courses/all', {
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
	const response = await fetch(process.env.REACT_APP_API_KEY + 'courses/add', {
		method: 'POST',
		body: JSON.stringify(course),
		headers,
	});
	const info = await response.json();
	console.log(info);
	if (response.ok && info.result) {
		return info.result as ICourse;
	}
	throw new Error(ERRORS.COURSES);
}

export async function deleteCourse(id: string) {
	const headers = await getAuthHeaders();
	const response = await fetch(
		process.env.REACT_APP_API_KEY + `courses/${id}`,
		{
			method: 'DELETE',
			headers,
		}
	);
	console.log(response);
	if (!response.ok) {
		throw new Error(ERRORS.COURSES);
	}
}

export async function saveCourses(
	newCourse: INewCourse
): Promise<Array<ICourse>> {
	const existingCourses = await getCourses();
	const id = uuidv4();

	const updatedCourses = existingCourses.concat({
		...newCourse,
		id,
	});
	localStorage.setItem(localStorageKey, JSON.stringify(updatedCourses));

	return updatedCourses;
}
