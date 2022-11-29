export function formatDate(dateString: string, spliter: string): string {
	const regex =
		/([0-9]|[0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|[0-9]|((1)[0-2]))(\/)\d{4}/;
	const match = dateString.match(regex);
	if (match && match[0]) {
		const [dd, mm, yy] = match[0].split('/');
		return `${dd.padStart(2, '0')}${spliter}${mm.padStart(
			2,
			'0'
		)}${spliter}${yy}`;
	}

	return '';
}
