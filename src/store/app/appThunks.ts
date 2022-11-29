import { getToken } from '../../api/user';
import { AppActions } from '../user/userActions';
import { AppThunkAction, loadMe } from '../user/userThunks';
import { appLoadActions } from './appActions';

function loadAppThunk<Actions extends AppActions<void, void>>(
	actions: Actions
): AppThunkAction {
	return async (dispatch) => {
		await dispatch(actions.init());
		try {
			getToken().then((token) => {
				if (token) {
					dispatch(loadMe);
				} else {
					dispatch(actions.success());
				}
			});
		} catch (error) {
			dispatch(actions.error(error as Error));
		}
	};
}

export const loadApp = loadAppThunk(appLoadActions);
