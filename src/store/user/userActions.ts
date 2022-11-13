import {
	ActionCreatorWithOptionalPayload,
	createAction,
} from '@reduxjs/toolkit';
import { IUserPayload } from '../../helpers/appTypes';

export const userLogined = createAction<IUserPayload>('USER/USER_LOGINED');
export const userLogouted = createAction('USER/USER_LOGOUTED');

export const loadMeRequest = createAction<void>('USER/LOAD_ME_REQUEST');
export const loadMeSuccess = createAction<IUserPayload>('USER/LOAD_ME_SUCCESS');
export const loadMeError = createAction<Error>('USER/LOAD_ME_ERROR');

export function createApiActions<InitPayload, SuccessPayload, ErrorPayload>(
	type: string
) {
	return {
		init: createAction<InitPayload>(`${type}_REQUEST`),
		success: createAction<SuccessPayload>(`${type}_SUCCESS`),
		error: createAction<ErrorPayload>(`${type}_ERROR`),
	} as {
		init: ActionCreatorWithOptionalPayload<void>;
		success: ActionCreatorWithOptionalPayload<IUserPayload>;
		error: ActionCreatorWithOptionalPayload<Error>;
	};
}

export const loadMeActions = createApiActions<void, IUserPayload, Error>(
	'USER/LOAD_ME'
);

export interface ApiActions {
	init: ActionCreatorWithOptionalPayload<void>;
	success: ActionCreatorWithOptionalPayload<IUserPayload>;
	error: ActionCreatorWithOptionalPayload<Error>;
}
