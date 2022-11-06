import { ERRORS } from '../constants/constants';
import { IAuthor, ICoursePayload, INewCourse } from './appTypes';

export function isValidCourseData(authors: Array<string>): boolean {
	return authors.length > 0;
}

export function getCourse(
	{ title, description, duration }: ICoursePayload,
	authors: Array<string>
): INewCourse {
	const creationDate = new Date().toLocaleString();
	return {
		title,
		description,
		authors,
		duration: Number(duration),
		creationDate,
	};
}

export function getValidatedData(
	course: ICoursePayload,
	authors: Array<string>
): INewCourse | null {
	if (isValidCourseData(authors)) {
		return getCourse(course, authors);
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
