import { IAuthor } from './appTypes';

export function getAuthorsString(
	ids: Array<string>,
	data: Array<IAuthor>
): string {
	const authorsNames = ids.map((id) => {
		const author = data.find((item) => item.id === id);
		return author ? author.name : '';
	});
	return authorsNames.filter(Boolean).join(', ');
}

export function getAuthorsArray(
	authorsIDs: Array<string>,
	authors: Array<IAuthor>
): Array<IAuthor> {
	return authors.filter((item) => authorsIDs.includes(item.id));
}
