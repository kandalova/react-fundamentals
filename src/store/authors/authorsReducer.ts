import { createReducer } from '@reduxjs/toolkit';
import { IAuthor } from '../../helpers/appTypes';
import { authorAdded, authorsLoaded } from './authorsActions';

const preloadedState = [] as Array<IAuthor>;

export const authorsReducer = createReducer<Array<IAuthor>>(
	preloadedState,
	(builder) => {
		builder.addCase(authorsLoaded, (state, action) => action.payload);
		builder.addCase(authorAdded, (state, action) => [...state, action.payload]);
	}
);
