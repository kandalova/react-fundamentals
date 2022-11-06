export interface ICourse {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: Array<string>;
}

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
}

export interface IUserPayload {
	name: string;
	email: string;
	token: string;
}

export interface ICreateCourseData {
	title: string;
	description: string;
	duration: number | string;
	courseAuthors: Array<string>;
}
