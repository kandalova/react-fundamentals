export function checkStringIncludes(
	value: string,
	searchValue: string
): boolean {
	return value.toLowerCase().includes(searchValue.toLowerCase());
}
