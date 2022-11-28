import { createReducer } from '@reduxjs/toolkit';
import { ICourse } from '../../helpers/appTypes';
import {
	courseAdded,
	courseDeleted,
	coursesLoaded,
	courseUpdated,
} from './coursesActions';

// Record<string, ICourse>;

const preparedState = [] as Array<ICourse>;
export const courseReducer = createReducer<Array<ICourse>>(
	preparedState,
	(bulder) => {
		bulder.addCase(coursesLoaded, (state, action) => action.payload);
		bulder.addCase(courseAdded, (state, action) => [...state, action.payload]);
		bulder.addCase(courseUpdated, (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload.id);
			state[index] = action.payload;
			return state;
		});
		bulder.addCase(courseDeleted, (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		});
	}
);
