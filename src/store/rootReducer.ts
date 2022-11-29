import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app/appReducer';
import { authorsReducer } from './authors/authorsReducer';
import { courseReducer } from './courses/coursesReducer';
import { userReducer } from './user/userReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: courseReducer,
	app: appReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
