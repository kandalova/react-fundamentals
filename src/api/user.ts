import { ERRORS } from '../constants/constants';
import { ISignIn, ISignUp, IUserPayload } from '../helpers/appTypes';

const tokenKey = 'token';
const tokenDefaultValue = '';

export const userDefaultValue = null;

export async function signUp(user: ISignUp) {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
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
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const info = await response.json();

	if (!response.ok || !info.successful) {
		const error: string = info.errors
			? info.errors[0]
			: info.result || ERRORS.LOGIN;
		throw new Error(error);
	}
	if (info.result && info.user) {
		await setToken(info.result);
		return { ...info.user, token: info.result };
	}
	throw new Error(ERRORS.LOGIN);
}

export async function getMe(token: string): Promise<IUserPayload> {
	const response = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const info = await response.json();
	console.log(info);
	if (!response.ok || !info.successful) {
		const error: string = info.errors
			? info.errors[0]
			: info.result || ERRORS.LOGIN;
		throw new Error(error);
	}
	if (info.result) {
		return { ...info.result, token };
	}
	throw new Error(ERRORS.LOGIN);
}

export async function signOut(token: string) {
	const response = await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	if (!response.ok) {
		throw new Error(ERRORS.LOGOUT);
	}
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
