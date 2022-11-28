import { createAction } from '@reduxjs/toolkit';
import { ICourse } from '../../helpers/appTypes';
import { createApiActions } from '../user/userActions';

export const coursesLoaded = createAction<Array<ICourse>>(
	'COURSES/COURSES_LOADED'
);
export const courseAdded = createAction<ICourse>('COURSES/COURSE_ADDED');
export const courseUpdated = createAction<ICourse>('COURSES/COURSE_UPDATED');

export const coursesLoadActions = createApiActions<void, void, Error>(
	'COURSES/COURSES_LOAD'
);
export const submitCourseActions = createApiActions<void, void, Error>(
	'COURSES/COURSE_SUBMIT'
);
export const deleteCourseActions = createApiActions<void, string, Error>(
	'COURSES/COURSE_DELETE'
);
