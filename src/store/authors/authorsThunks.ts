import { FormikState } from 'formik';
import { addAuthor, getAuthors } from '../../api/authors';
import { getCourseByID } from '../../api/courses';
import { IAuthor, IAuthorPayload } from '../../helpers/appTypes';
import { AppActions } from '../user/userActions';
import { AppThunkAction } from '../user/userThunks';
import {
	authorAddActions,
	authorsLoadActions,
	authorsLoaded,
} from './authorsActions';

type SetFormikValues = (
	values: unknown,
	shouldValidate?: boolean | undefined
) => void;

type resetFormik = (
	nextState?: Partial<FormikState<IAuthorPayload>> | undefined
) => void;

function getAuthorsWithCourseThunk<Actions extends AppActions<void, void>>(
	id: string,
	setValues: SetFormikValues,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		Promise.all([getAuthors(), id ? getCourseByID(id) : null])
			.then(([authors, course]) => {
				console.log(authors, course);
				dispatch(authorsLoaded(authors));
				if (id && course) {
					const { id: _, ...coursePayload } = course;
					setValues(coursePayload);
				}
			})
			.finally(() => {
				dispatch(actions.success());
			});
	};
}

function addNewAuthorThunk<Actions extends AppActions<void, IAuthor>>(
	payload: IAuthorPayload,
	resetForm: resetFormik,
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			const data = await addAuthor(payload);
			dispatch(actions.success(data));
			resetForm();
		} catch (e) {
			dispatch(actions.error(e as Error));
		}
	};
}

export const getAuthorsWithCourse = (id: string, setValues: SetFormikValues) =>
	getAuthorsWithCourseThunk(id, setValues, authorsLoadActions);
export const addNewAuthor = (payload: IAuthorPayload, resetForm: resetFormik) =>
	addNewAuthorThunk(payload, resetForm, authorAddActions);
