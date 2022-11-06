import { StoreState } from '../rootReducer';

export const selectAuthors = (state: StoreState) => state.authors;
