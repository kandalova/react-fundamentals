import React from 'react';
import { userDefaultValue } from './api/user';

import App from './App';
import { createUserContext } from './context/UserContext';
import { SimpleUser } from './helpers/appTypes';

const [UserCtx, UserContextProvider] = createUserContext<SimpleUser | null>(
	null
);
export const UserContext = UserCtx;

function AppWrapper() {
	return (
		<UserContextProvider>
			<App />
		</UserContextProvider>
	);
}

export default AppWrapper;
