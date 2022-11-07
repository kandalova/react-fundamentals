import { ERRORS } from '../constants/constants';
import { IAuthor, ICoursePayload, INewCourse } from './appTypes';

export function isValidCourseData(authors: Array<string>): boolean {
	return authors.length > 0;
}

export function getCourse({
	title,
	description,
	duration,
	authors,
}: ICoursePayload): INewCourse {
	const creationDate = new Date().toLocaleString();
	return {
		title,
		description,
		authors,
		duration: Number(duration),
		creationDate,
	};
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
