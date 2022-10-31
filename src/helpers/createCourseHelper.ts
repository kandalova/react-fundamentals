import { ERRORS } from '../constants/constants';
import { ICourse, ICreateCourseData } from './appTypes';

export function isValidCourseData({
	title,
	description,
	duration,
	courseAuthors,
}: ICreateCourseData): boolean {
	return !!(
		title &&
		description &&
		description.length > 2 &&
		duration &&
		duration > 0 &&
		courseAuthors.length > 0
	);
}

export function getCourse({
	title,
	description,
	duration,
	courseAuthors,
}: ICreateCourseData): Omit<ICourse, 'id'> {
	const creationDate = new Date().toLocaleString();
	return {
		title,
		description,
		duration: Number(duration),
		authors: courseAuthors,
		creationDate,
	};
}

export function getValidatedData(
	course: ICreateCourseData
): Omit<ICourse, 'id'> | null {
	if (isValidCourseData(course)) {
		return getCourse(course);
	}
	alert(ERRORS.NEW_COURSE);
	return null;
}
