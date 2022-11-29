import { ERRORS } from '../constants/constants';
import { ISignIn, ISignUp, IUserPayload } from '../helpers/appTypes';
import { getAuthHeaders, getHeaders } from './headers';

const tokenKey = 'token';
const tokenDefaultValue = '';

export const userDefaultValue = null;

export async function signUp(user: ISignUp) {
	const headers = getHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}register`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers,
	});
	const info = await response.json();
	if (!response.ok || !info.successful) {
		const error: string = info.errors
			? info.errors[0]
			: info.result || ERRORS.REGISTRATION;
		throw new Error(error);
	}
}

export async function signIn(user: ISignIn): Promise<IUserPayload> {
	const headers = getHeaders();
	const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers,
	});
	const info = await response.json();

	if (!response.ok || !info.successful) {
		const error: string = info.errors
			? info.errors[0]
			: info.result || ERRORS.LOGIN;
		throw new Error(error);
	} else if (info.result && info.user) {
		await setToken(info.result);
		return { ...info.user, token: info.result };
	}
	throw new Error(ERRORS.LOGIN);
}

export async function getMe(token: string): Promise<IUserPayload> {
	const headers = await getAuthHeaders(token);
	const response = await fetch(`${process.env.REACT_APP_API_URL}users/me`, {
		method: 'GET',
		headers: headers,
	});
	const info = await response.json();
	if (!response.ok || !info.successful) {
		const error: string = info.errors
			? info.errors[0]
			: info.result || ERRORS.LOGIN;
		throw new Error(error);
	}
	if (info.result) {
		const { password: _, ...user } = info.result;
		return { ...user, token };
	}
	throw new Error(ERRORS.LOGIN);
}

export async function signOut() {
	const headers = await getAuthHeaders();
	await fetch(`${process.env.REACT_APP_API_URL}logout`, {
		method: 'DELETE',
		headers,
	});
	removeToken();
}

export async function setToken(
	userToken: string | null
): Promise<string | null> {
	localStorage.setItem(tokenKey, JSON.stringify(userToken));
	return userToken;
}

export async function getToken(): Promise<string> {
	const content = localStorage.getItem(tokenKey);
	if (!content) {
		return tokenDefaultValue;
	}

	return JSON.parse(content);
}

export function removeToken() {
	localStorage.removeItem(tokenKey);
}
