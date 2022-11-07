import React from 'react';
import { IAuthor } from '../../../../helpers/appTypes';
import { AuthorItem } from '../AuthorItem/AuthorItem';

interface IAuthorListSection {
	title: string;
	availableAuthors: Array<IAuthor>;
	value: Array<IAuthor['id']>;
	onClick?: (id: string) => void;
	buttonText: string;
}

export function AuthorListSection({
	title,
	value,
	availableAuthors,
	onClick,
	buttonText,
}: IAuthorListSection) {
	return (
		<div>
			<h1>{title}</h1>
			{availableAuthors
				.filter((author) => value.includes(author.id))
				.map((item) => {
					return (
						<AuthorItem
							author={item}
							key={item.id}
							buttonText={buttonText}
							onClick={onClick}
						/>
					);
				})}
		</div>
	);
}
