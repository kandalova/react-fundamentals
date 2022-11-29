import {
	Action,
	AnyAction,
	ThunkAction,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { getMe, getToken, signIn, signOut, signUp } from '../../api/user';
import { ISignIn, ISignUp } from '../../helpers/appTypes';
import { StoreState } from '../rootReducer';
import {
	AppActions,
	loadMeActions,
	userLoginActions,
	userLogouted,
	userRegistrationActions,
} from './userActions';
import { history } from '../../history';
import { getErrorString } from '../../helpers/errorTypeHandler';

export type AppThunkAction<ReturnType = unknown> = ThunkAction<
	ReturnType,
	StoreState,
	unknown,
	AnyAction
>;
export type AppDispatch = ThunkDispatch<StoreState, unknown, Action>;

function getMeThunk<Payload, Actions extends AppActions<void, Payload>>(
	apiCall: (token: string) => Promise<Payload>,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			const token = await getToken();
			const data = await apiCall(token);
			dispatch(actions.success(data));
		} catch (e) {
			dispatch(actions.error(e as Error));
		}
	};
}

function loginThunk<Actions extends AppActions<void, void, string>>(
	payload: ISignIn,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			await signIn(payload);
			await dispatch(getMeThunk(getMe, loadMeActions));
			history.push('/courses');
		} catch (e) {
			const error = getErrorString(e);
			dispatch(actions.error(error));
		}
	};
}

function logoutThunk(): AppThunkAction {
	return async (dispatch) => {
		signOut().then(() => {
			dispatch(userLogouted());
			history.push('/login');
		});
	};
}

function registrationThunk<Actions extends AppActions<void, void, string>>(
	payload: ISignUp,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			await signUp(payload);
			dispatch(actions.success());
			history.push('/login');
		} catch (e) {
			const error = getErrorString(e);
			dispatch(actions.error(error));
		}
	};
}

export const logoutUser = logoutThunk();
export const loadMe = getMeThunk(getMe, loadMeActions);
export const loginUser = (payload: ISignIn) =>
	loginThunk(payload, userLoginActions);
export const signUpUser = (payload: ISignUp) =>
	registrationThunk(payload, userRegistrationActions);
