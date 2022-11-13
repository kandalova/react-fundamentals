import { combineReducers, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { IUserInfo } from '../../helpers/appTypes';
import { loadMeActions, userLogouted } from './userActions';

const preloadedState: IUserInfo = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userInfo = createReducer<IUserInfo>(preloadedState, (builder) => {
	builder.addCase(userLogouted, () => {
		return preloadedState;
	});
	builder.addCase(loadMeActions.success, (_state, action) => {
		return { ...action.payload, isAuth: true };
	});
});

const isAdmin = createReducer(false, (builder) => {
	builder.addCase(userLogouted, () => false);
	builder.addCase(
		loadMeActions.success,
		(_, action) => action.payload.role === 'admin'
	);
});

const isUserLoading = createReducer(false, (builder) => {
	builder.addCase(loadMeActions.init, () => true);
	builder.addMatcher(
		isAnyOf(loadMeActions.success, loadMeActions.error),
		() => false
	);
});

export const userReducer = combineReducers({
	userInfo,
	isAdmin,
	isUserLoading,
});
