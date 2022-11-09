import { StoreState } from '../rootReducer';

export const selectCourses = (state: StoreState) => state.courses;

export const selectCourseById = (id: string) => (store: StoreState) => {
	return store.courses.find((course) => course.id === id);
};
