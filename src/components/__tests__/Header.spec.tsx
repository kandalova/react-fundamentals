import { renderApp } from '../../utils/renderApp';
import { Header } from '../Header/Header';
import { screen } from '@testing-library/react';
import React from 'react';

jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');

	return {
		...originalModule,
		useDispatch: () => jest.fn(),
	};
});

describe('Header', () => {
	it('Component should render header with username', () => {
		const testUser = {
			isAuth: true,
			name: 'TestUser',
		};
		renderApp(<Header />, {
			user: { userInfo: testUser },
		});

		expect(screen.getByAltText('My logo')).toBeVisible();
		expect(screen.getByText(testUser.name)).toBeVisible();
	});

	it('Component should render header without username', () => {
		const testUser = {
			isAuth: false,
			name: 'TestUser',
		};
		renderApp(<Header />, {
			user: { userInfo: testUser },
		});

		expect(screen.getByAltText('My logo')).toBeVisible();
		expect(screen.queryByText(testUser.name)).toBeNull();
	});
});
