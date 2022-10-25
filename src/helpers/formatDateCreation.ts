export function formatDate(dateString: string, spliter: string): string {
	const date = new Date(dateString);
	const dd = date.getDate().toString();
	const mm = (date.getMonth() + 1).toString();
	const yy = date.getFullYear().toString();

	return `${dd.padStart(2, '0')}${spliter}${mm.padStart(
		2,
		'0'
	)}${spliter}${yy}`;
}
