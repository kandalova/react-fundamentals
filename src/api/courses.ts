import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { mockedCoursesList } from '../constants/MockedCourses';
import { ICourse } from '../helpers/appTypes';

export const CoursesContext = createContext<Array<ICourse>>([]);
const localStorageKey = 'courses';

export async function getCourses(): Promise<Array<ICourse>> {
	const content = localStorage.getItem(localStorageKey);
	if (!content) {
		return mockedCoursesList;
	}

	return JSON.parse(content);
}

export async function saveCourses(
	newCourse: Omit<ICourse, 'id'>
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
