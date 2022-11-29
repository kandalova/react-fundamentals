import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { IAuthor } from '../../../../helpers/appTypes';

import classes from './authorItem.module.scss';

interface IAuthorItem {
	author: IAuthor;
	onClick?: (id: string) => void;
	buttonText: string;
}

export function AuthorItem({ author, onClick, buttonText }: IAuthorItem) {
	return (
		<div className={classes.author}>
			<span>{author.name}</span>
			<Button text={buttonText} onClick={() => onClick && onClick(author.id)} />
		</div>
	);
}
