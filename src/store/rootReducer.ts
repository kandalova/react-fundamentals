import { combineReducers } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/authorsReducer';
import { courseReducer } from './courses/coursesReducer';
import { userReducer } from './user/userReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: courseReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
