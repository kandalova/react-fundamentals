import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { DeepPartial } from '@reduxjs/toolkit';
import { createStore } from '../store';
import { StoreState } from '../store/rootReducer';
import React from 'react';

export function renderApp(
	ui: Parameters<typeof render>[0],
	preloadedState: DeepPartial<StoreState> = {}
) {
	const store = createStore(preloadedState);
	return render(<Provider store={store}>{ui}</Provider>);
}
