import React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import { createStore } from './store';

const store = createStore();

function AppWrapper() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

export default AppWrapper;
