import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { rootReducer, StoreState } from './rootReducer';

export function createStore(preloadedState?: DeepPartial<StoreState>) {
	return configureStore({
		reducer: rootReducer,
		// To fix TS warning, preloaded state should only be used in test env
		preloadedState: preloadedState as StoreState,
	});
}
