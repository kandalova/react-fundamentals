import { combineReducers } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/authorsReducer';
import { userReducer } from './user/userReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
