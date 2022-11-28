import { createApiActions } from '../user/userActions';

export const appLoadActions = createApiActions<void, void, void>(
	'APP/APP_LOAD'
);
