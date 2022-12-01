import { renderApp } from '../../utils/renderApp';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CourseCard } from '../Courses/components/CourseCard/CourseCard';
import { IAuthor } from '../../helpers/appTypes';

jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');

	return {
		...originalModule,
		useDispatch: () => jest.fn(),
	};
});
const mockedAuthors: Array<IAuthor> = [
	{ id: '1', name: 'test author' },
	{ id: '2', name: 'test author' },
];
const mockedCourse = {
	id: '1',
	title: 'course title',
	description: 'course desc',
	creationDate: '20/02/1997',
	duration: 64,
	authors: ['1', '2'],
};

describe('Courses', () => {
	it('Component should render course card', () => {
		renderApp(<CourseCard course={mockedCourse} />, {
			authors: { authors: mockedAuthors },
		});
		expect(screen.getByText(mockedCourse.title)).toBeVisible();
		expect(screen.getByText(mockedCourse.description)).toBeVisible();
		// expect(
		// 	screen.getByText(formatDate(mockedCourse.creationDate, '.'))
		// ).toBeVisible();
		expect(screen.getByText('20.02.1997')).toBeVisible();
		// expect(
		// 	screen.getByText(formatDuration(mockedCourse.duration))
		// ).toBeVisible();
		expect(screen.getByText('01:04 hour')).toBeVisible();
		expect(screen.getByText('test author, test author')).toBeVisible();
	});
});
