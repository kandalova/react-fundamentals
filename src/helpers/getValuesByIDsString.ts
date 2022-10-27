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
