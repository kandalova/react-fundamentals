import { combineReducers, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { IAuthor } from '../../helpers/appTypes';
import {
	authorAddActions,
	authorsLoadActions,
	authorsLoaded,
} from './authorsActions';

const preloadedState = [] as Array<IAuthor>;

const authors = createReducer<Array<IAuthor>>(preloadedState, (builder) => {
	builder.addCase(authorsLoaded, (_state, action) => action.payload);
	builder.addCase(authorAddActions.success, (state, action) => [
		...state,
		action.payload,
	]);
});

const isAuthorsWithCourseLoaded = createReducer(false, (builder) => {
	builder.addCase(authorsLoadActions.init, () => false);
	builder.addMatcher(
		isAnyOf(authorsLoadActions.success, authorsLoadActions.error),
		() => true
	);
});

export const authorsReducer = combineReducers({
	authors,
	isAuthorsWithCourseLoaded,
});
