export function checkStringIncludes(
	value: string | null,
	searchValue: string
): boolean {
	return !!value && value.toLowerCase().includes(searchValue.toLowerCase());
}
