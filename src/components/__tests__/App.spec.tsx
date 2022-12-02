import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderApp } from '../../utils/renderApp';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');
	return {
		...originalModule,
		useDispatch: () => mockDispatch,
	};
});

describe('App', () => {
	it('Should render course foem after click', async () => {
		renderApp(<App />, {
			user: {
				isUserLoading: false,
				userInfo: { isAuth: true, token: 'mocktoken', role: 'admin' },
			},
			app: { AppLoadingState: { isLoadingDone: true, isLoadingStart: true } },
		});

		userEvent.click(screen.getByTestId('add-course'));

		await waitFor(() => {
			expect(screen.getByText('Add author')).toBeVisible();
		});
	});
});
