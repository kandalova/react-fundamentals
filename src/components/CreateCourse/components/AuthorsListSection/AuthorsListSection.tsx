import React from 'react';

import { IAuthor } from '../../../../helpers/appTypes';
import { AuthorItem } from '../AuthorItem/AuthorItem';

interface IAuthorListSection {
	title: string;
	authorList: Array<IAuthor>;
	onClick?: (id: string) => void;
	buttonText: string;
	value: Array<IAuthor['id']>;
}

export function AuthorListSection({
	title,
	authorList,
	onClick,
	buttonText,
	value,
}: IAuthorListSection) {
	return (
		<div>
			<h1>{title}</h1>
			{authorList
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
