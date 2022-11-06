import { StoreState } from '../rootReducer';

export const selectUser = (state: StoreState) => state.user;
export const selectToken = (state: StoreState) => state.user.token;
