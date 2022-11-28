import { combineReducers, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { IUserInfo } from '../../helpers/appTypes';
import {
	loadMeActions,
	userLoginActions,
	userLogouted,
	userRegistrationActions,
} from './userActions';

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

const isUserLoading = createReducer(false, (builder) => {
	builder.addCase(loadMeActions.init, () => true);
	builder.addMatcher(
		isAnyOf(loadMeActions.success, loadMeActions.error),
		() => false
	);
});

const loginError = createReducer('', (builder) => {
	builder.addCase(userLoginActions.error, (_state, action) => {
		return action.payload;
	});
	builder.addMatcher(
		isAnyOf(userLoginActions.init, loadMeActions.success),
		() => ''
	);
});

const registrationError = createReducer('', (builder) => {
	builder.addCase(userRegistrationActions.error, (_state, action) => {
		return action.payload;
	});
	builder.addMatcher(
		isAnyOf(userRegistrationActions.init, userRegistrationActions.success),
		() => ''
	);
});

const isRegistrationInProcess = createReducer(false, (builder) => {
	builder.addCase(userRegistrationActions.init, () => true);
	builder.addMatcher(
		isAnyOf(userRegistrationActions.error, userRegistrationActions.success),
		() => false
	);
});

const isLoginInProcess = createReducer(false, (builder) => {
	builder.addCase(userLoginActions.init, () => true);
	builder.addMatcher(
		isAnyOf(userLoginActions.error, loadMeActions.success),
		() => false
	);
});

export const userReducer = combineReducers({
	userInfo,
	isUserLoading,
	loginError,
	isLoginInProcess,
	registrationError,
	isRegistrationInProcess,
});
