export function getValuesByIDsString(
	ids: Array<string>,
	prop: string,
	data: Array<any>
): string {
	const authorsNames = ids.map((id) => {
		const author = data.find((item) => item.id === id);
		return author ? author[prop] : '';
	});
	return authorsNames.filter(Boolean).join(', ');
}
