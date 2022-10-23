export function formatDate(dateString: string, spliter: string): string {
	const date = new Date(dateString);
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const yy = date.getFullYear();

	return `${dd < 10 ? '0' + dd : dd}${spliter}${
		mm < 10 ? '0' + mm : mm
	}${spliter}${yy}`;
}
