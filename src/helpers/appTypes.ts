export interface ICourse {
	id: string | null;
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
