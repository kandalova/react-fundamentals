import { ERRORS } from '../constants/constants';
import { IUser, SimpleUser } from '../helpers/appTypes';
const tokenKey = 'token';
const userKey = 'user';
const tokenDefaultValue = null;

export const userDefaultValue = null;

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

export async function signIn(user: Omit<IUser, 'name'>): Promise<SimpleUser> {
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
		await saveToken(info.result);
		return info.user;
	}
	throw new Error(ERRORS.LOGIN);
}

export async function signOut(): Promise<null> {
	localStorage.removeItem(tokenKey);
	localStorage.removeItem(userKey);
	return null;
}

export async function getUsers(): Promise<SimpleUser | null> {
	const user = await localStorage.getItem(userKey);
	const token = await getToken();
	if (user && token) {
		return JSON.parse(user);
	}
	return null;
}

export async function saveUser(user: SimpleUser): Promise<SimpleUser> {
	localStorage.setItem(userKey, JSON.stringify(user));
	return user;
}

export async function saveToken(
	userToken: string | null
): Promise<string | null> {
	localStorage.setItem(tokenKey, JSON.stringify(userToken));
	return userToken;
}

export async function getToken(): Promise<string | null> {
	const content = localStorage.getItem(tokenKey);
	if (!content) {
		return tokenDefaultValue;
	}

	return JSON.parse(content);
}

export async function getUser(): Promise<SimpleUser | null> {
	const content = localStorage.getItem(userKey);
	if (!content) {
		return userDefaultValue;
	}

	return JSON.parse(content);
}
