import { createAction } from '@reduxjs/toolkit';
import { IAuthor } from '../../helpers/appTypes';

export const authorsLoaded = createAction<Array<IAuthor>>(
	'AUTHORS/AUTHORS_LOADED'
);
export const authorAdded = createAction<IAuthor>('AUTHORS/AUTHOR_ADDED');
