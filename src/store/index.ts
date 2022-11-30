import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { rootReducer, StoreState } from './rootReducer';

export function createStore(preloadedState?: DeepPartial<StoreState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}
