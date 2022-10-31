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

export interface IUser {
	name: string;
	password: string;
	email: string;
}

export interface ICreateCourseData {
	title: string;
	description: string;
	duration: number | string;
	courseAuthors: Array<string>;
}
