import { ERRORS } from '../constants/constants';
import { IUser } from '../helpers/appTypes';

const tokenKey = 'token';
const userKey = 'user';

export async function signUp(user: IUser) {
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

export async function signIn(user: Omit<IUser, 'name'>) {
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
	if (info.result) {
		setToken(info.result);
	}
	if (info.user) {
		setUser(info.user);
	}
}

export async function signOut(): Promise<Omit<IUser, 'password'> | null> {
	localStorage.removeItem(tokenKey);
	localStorage.removeItem(userKey);
	return null;
}

function setUser(
	user: Omit<IUser, 'password'> | null
): Omit<IUser, 'password'> | null {
	localStorage.setItem(userKey, JSON.stringify(user));
	return user;
}

export async function getUser(): Promise<Omit<IUser, 'password'> | null> {
	const user = localStorage.getItem(userKey);
	const token = await getToken();
	if (user && token) {
		return JSON.parse(user);
	}
	return null;
}

function setToken(userToken: string | null): string | null {
	localStorage.setItem(tokenKey, JSON.stringify(userToken));
	return userToken;
}

export async function getToken(): Promise<string | null> {
	return localStorage.getItem(tokenKey);
}
