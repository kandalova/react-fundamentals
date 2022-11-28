import { StoreState } from '../rootReducer';

export const selectIsAppLoaded = (state: StoreState) =>
	state.app.AppLoadingState.isLoadingDone &&
	state.app.AppLoadingState.isLoadingDone;
