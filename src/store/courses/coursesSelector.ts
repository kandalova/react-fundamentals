import { StoreState } from '../rootReducer';

export const selectCourses = (state: StoreState) => state.courses.courses;

export const selectCourseById = (id: string) => (store: StoreState) => {
	return store.courses.courses.find((course) => course.id === id);
};

export const coursesWithAuthorsIsLoaded = (store: StoreState) => {
	return store.courses.isCoursesLoaded;
};
