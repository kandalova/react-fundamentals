import { getToken } from './user';

export async function getAuthHeaders(givenToken?: string) {
	const token = givenToken ? givenToken : await getToken();
	return {
		'Content-Type': 'application/json',
		Authorization: token,
	};
}

export function getHeaders() {
	return {
		'Content-Type': 'application/json',
	};
}
