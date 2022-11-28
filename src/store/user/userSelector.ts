import { StoreState } from '../rootReducer';

export const selectUser = (state: StoreState) => state.user.userInfo;
export const selectToken = (state: StoreState) => state.user.userInfo.token;
export const selectIsUserLoading = (state: StoreState) =>
	state.user.isUserLoading;

export const selectIsAdmin = (state: StoreState) =>
	state.user.userInfo.role === 'admin';
export const selectLoginError = (state: StoreState) => state.user.loginError;
