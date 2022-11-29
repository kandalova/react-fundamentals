export interface IAuthor {
	id: string;
	name: string;
}

export type IAuthorPayload = Omit<IAuthor, 'id'>;

export interface ISignUp {
	name: string;
	password: string;
	email: string;
}

export interface ISignIn {
	password: string;
	email: string;
}

export interface IUserInfo {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

export interface IUserPayload {
	name: string;
	email: string;
	token: string;
	role: string;
}

export interface ICoursePayload {
	title: string;
	description: string;
	duration: number | string;
	authors: Array<string>;
	creationDate: string;
}

export interface ICourse {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: Array<string>;
}

export interface INewCourse {
	title: string;
	description: string;
	duration: number;
	authors: Array<string>;
}
