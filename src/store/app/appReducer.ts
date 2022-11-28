import { combineReducers, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { loadMeActions } from '../user/userActions';
import { appLoadActions } from './appActions';

interface IAppLoadingState {
	isLoadingStart: boolean;
	isLoadingDone: boolean;
}

const preloadedState: IAppLoadingState = {
	isLoadingStart: false,
	isLoadingDone: false,
};

const AppLoadingState = createReducer<IAppLoadingState>(
	preloadedState,
	(builder) => {
		builder.addCase(appLoadActions.init, (state) => {
			return { ...state, isLoadingStart: true };
		});
		builder.addMatcher(
			isAnyOf(
				loadMeActions.success,
				loadMeActions.error,
				appLoadActions.error,
				appLoadActions.success
			),
			(state) => {
				if (state.isLoadingStart && !state.isLoadingDone)
					return { ...state, isLoadingDone: true };
			}
		);
	}
);

export const appReducer = combineReducers({
	AppLoadingState,
});
