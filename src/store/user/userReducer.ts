import { createReducer } from '@reduxjs/toolkit';
import { IUserInfo } from '../../helpers/appTypes';
import { userLogined, userLogouted } from './userActions';

const preloadedState: IUserInfo = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = createReducer<IUserInfo>(
	preloadedState,
	(builder) => {
		builder.addCase(userLogined, (_state, action) => {
			return { ...action.payload, isAuth: true };
		});
		builder.addCase(userLogouted, () => {
			return preloadedState;
		});
	}
);
