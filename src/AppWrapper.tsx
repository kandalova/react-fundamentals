import React from 'react';

import App from './App';
import { createUserContext } from './context/UserContext';
import { IUser } from './helpers/appTypes';

const [UserCtx, UserContextProvider] = createUserContext<IUser | null>(null);
export const UserContext = UserCtx;

function AppWrapper() {
	return (
		<UserContextProvider>
			<App />
		</UserContextProvider>
	);
}

export default AppWrapper;
