import React from 'react';

import { AuthorItem } from '../AuthorItem/AuthorItem';

interface IAuthorListSection {
	title: string;
	authors: Array<any>;
	onClick?: (id: string) => void;
	buttonText: string;
}

export function AuthorListSection({
	title,
	authors,
	onClick,
	buttonText,
}: IAuthorListSection) {
	return (
		<div>
			<h1>{title}</h1>
			{authors.map((item) => {
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
