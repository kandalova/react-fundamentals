import { getAuthors } from '../../api/authors';
import {
	addCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../api/courses';
import { ICoursePayload } from '../../helpers/appTypes';
import { getCourse } from '../../helpers/createCourseHelper';
import { authorsLoaded } from '../authors/authorsActions';
import { AppActions } from '../user/userActions';
import { AppThunkAction } from '../user/userThunks';
import {
	courseAdded,
	coursesLoadActions,
	coursesLoaded,
	courseUpdated,
	deleteCourseActions,
	submitCourseActions,
} from './coursesActions';
import { history } from '../../history';

function getCoursesWithAuthorsThunk<Actions extends AppActions<void, void>>(
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		Promise.all([getCourses(), getAuthors()])
			.then(([courses, authors]) => {
				dispatch(coursesLoaded(courses));
				dispatch(authorsLoaded(authors));
			})
			.finally(() => {
				dispatch(actions.success());
			});
	};
}

function submitCourseThunk<Actions extends AppActions<void, void>>(
	payload: ICoursePayload,
	id: string,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			if (id) {
				const data = await updateCourse(payload, id);
				await dispatch(courseUpdated(data));
			} else {
				const newCourse = getCourse(payload);
				const data = await addCourse(newCourse);
				await dispatch(courseAdded(data));
			}
			dispatch(actions.success());
			history.push('/courses');
		} catch (e) {
			dispatch(actions.error(e as Error));
		}
	};
}
function deleteCourseThunk<Actions extends AppActions<void, string>>(
	id: string,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			await deleteCourse(id);
			dispatch(actions.success(id));
		} catch (e) {
			dispatch(actions.error(e as Error));
		}
	};
}

export const getCoursesWithAuthors =
	getCoursesWithAuthorsThunk(coursesLoadActions);
export const submitCourse = (payload: ICoursePayload, id: string) =>
	submitCourseThunk(payload, id, submitCourseActions);
export const removeCourse = (id: string) =>
	deleteCourseThunk(id, deleteCourseActions);
