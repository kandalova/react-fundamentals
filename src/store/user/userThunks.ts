import {
	Action,
	AnyAction,
	ThunkAction,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { getMe, getToken, signIn, signOut } from '../../api/user';
import { ISignIn, IUserPayload } from '../../helpers/appTypes';
import { StoreState } from '../rootReducer';
import {
	createApiActions,
	loadMeActions,
	loadMeError,
	loadMeRequest,
	loadMeSuccess,
	userLogouted,
} from './userActions';
import { history } from '../../history';

export type AppThunkAction<ReturnType = unknown> = ThunkAction<
	ReturnType,
	StoreState,
	unknown,
	AnyAction
>;
export type AppDispatch = ThunkDispatch<StoreState, unknown, Action>;

function getMeThunk(): AppThunkAction {
	return async (dispatch) => {
		await dispatch(loadMeRequest);
		try {
			const token = await getToken();
			const data = await getMe(token);
			dispatch(loadMeSuccess(data));
		} catch (e) {
			dispatch(loadMeError(e as Error));
		}
	};
}

function getMeThunkTest(
	actions: ReturnType<typeof createApiActions>
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init);
		try {
			const token = await getToken();
			const data = await getMe(token);
			dispatch(actions.success(data));
		} catch (e) {
			dispatch(actions.error(e as Error));
		}
	};
}

function loginThunk(payload: ISignIn): AppThunkAction {
	return async (dispatch) => {
		try {
			const loginedUserPayload = await signIn(payload);
			console.log(loginedUserPayload);
			await dispatch(getMeThunkTest(loadMeActions));
			history.push('/courses');
		} catch (error: unknown) {
			// const message = getErrorString(error);
			// setError(message);
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

export const loadMe = getMeThunk();
export const loginUser = (payload: ISignIn) => loginThunk(payload);
export const logoutUser = logoutThunk();

export const loadMeTest = getMeThunkTest(loadMeActions);
