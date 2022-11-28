import { createAction } from '@reduxjs/toolkit';
import { IAuthor } from '../../helpers/appTypes';
import { createApiActions } from '../user/userActions';

export const authorsLoaded = createAction<Array<IAuthor>>(
	'AUTHORS/AUTHORS_LOADED'
);

export const authorsLoadActions = createApiActions<void, void, Error>(
	'AUTHORS/AUTHORS_LOAD'
);
export const authorAddActions = createApiActions<void, IAuthor, Error>(
	'AUTHORS/AUTHOR_ADD'
);
