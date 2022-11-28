import { combineReducers, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { ICourse } from '../../helpers/appTypes';
import {
	courseAdded,
	coursesLoadActions,
	coursesLoaded,
	courseUpdated,
	deleteCourseActions,
} from './coursesActions';

// Record<string, ICourse>;

const preparedState = [] as Array<ICourse>;
export const courses = createReducer<Array<ICourse>>(
	preparedState,
	(bulder) => {
		bulder.addCase(coursesLoaded, (_state, action) => action.payload);
		bulder.addCase(courseAdded, (state, action) => [...state, action.payload]);
		bulder.addCase(courseUpdated, (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload.id);
			state[index] = action.payload;
			return state;
		});
		bulder.addCase(deleteCourseActions.success, (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		});
	}
);

export const isCoursesLoaded = createReducer(false, (builder) => {
	builder.addCase(coursesLoadActions.init, () => false);
	builder.addMatcher(
		isAnyOf(coursesLoadActions.success, coursesLoadActions.error),
		() => true
	);
});

export const courseReducer = combineReducers({
	courses,
	isCoursesLoaded,
});
