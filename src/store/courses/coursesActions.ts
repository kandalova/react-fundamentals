import { createAction } from '@reduxjs/toolkit';
import { ICourse } from '../../helpers/appTypes';

export const coursesLoaded = createAction<Array<ICourse>>(
	'COURSES/COURSES_LOADED'
);
export const courseAdded = createAction<ICourse>('COURSES/COURSE_ADDED');
export const courseDeleted = createAction<string>('COURSES/COURSE_DELETED');
export const courseUpdated = createAction<ICourse>('COURSES/COURSE_UPDATED');
