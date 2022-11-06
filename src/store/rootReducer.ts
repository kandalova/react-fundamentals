import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/userReducer';

export const rootReducer = combineReducers({
	user: userReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
