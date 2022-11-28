import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { IUserPayload } from '../../helpers/appTypes';

export type AppAction<Payload = unknown> = PayloadActionCreator<
	Payload,
	string
>;
export type AppActions<
	RequestPayload = any,
	SuccessPayload = any,
	ErrorPayload = any
> = {
	init: AppAction<RequestPayload>;
	success: AppAction<SuccessPayload>;
	error: AppAction<ErrorPayload>;
};
export function createApiActions<InitPayload, SuccessPayload, ErrorPayload>(
	type: string
): AppActions<InitPayload, SuccessPayload, ErrorPayload> {
	return {
		init: createAction<InitPayload>(`${type}_REQUEST`),
		success: createAction<SuccessPayload>(`${type}_SUCCESS`),
		error: createAction<ErrorPayload>(`${type}_ERROR`),
	};
}

export const loadMeActions = createApiActions<void, IUserPayload, Error>(
	'USER/LOAD_ME'
);
export const userLoginActions = createApiActions<void, void, string>(
	'USER/USER_LOGIN'
);
export const userLogouted = createAction('USER/USER_LOGOUTED');
