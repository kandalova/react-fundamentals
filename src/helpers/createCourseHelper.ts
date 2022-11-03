import { ERRORS } from '../constants/constants';
import { IAuthor, ICourse, ICreateCourseData } from './appTypes';

export function isValidCourseData({
	courseAuthors,
}: ICreateCourseData): boolean {
	return courseAuthors.length > 0;
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

export function getAvailableList(
	ids: string[],
	authors: Array<IAuthor>
): Array<IAuthor> {
	return authors.filter((author) => {
		return !ids.includes(author.id);
	});
}

export function getReservedList(
	ids: string[],
	authors: Array<IAuthor>
): Array<IAuthor> {
	return authors.filter((author) => {
		return ids.includes(author.id);
	});
}
