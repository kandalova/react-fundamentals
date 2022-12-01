import { renderApp } from '../../utils/renderApp';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CourseCard } from '../Courses/components/CourseCard/CourseCard';
import { IAuthor } from '../../helpers/appTypes';
import { Courses } from '../Courses/Courses';

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
const mockedCourses = [
	{
		id: '1',
		title: 'course title',
		description: 'course desc',
		creationDate: '20/02/1997',
		duration: 64,
		authors: ['1', '2'],
	},
	{
		id: '2',
		title: 'course title',
		description: 'course desc',
		creationDate: '20/02/1997',
		duration: 64,
		authors: ['1', '2'],
	},
];
jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');

	return {
		...originalModule,
		useDispatch: () => jest.fn(),
	};
});

jest.mock('../../store/courses/coursesThunks', () => ({
	getCoursesWithAuthors: jest.fn(),
}));

describe('Courses', () => {
	it('Component should render course card', () => {
		const mockedCourse = mockedCourses[0];
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

	it('Component should render courses list', () => {
		// jest.doMock(
		// 	'../../components/Courses/components/CourseCard/CourseCard',
		// 	() => 'CourseCard'
		// );

		renderApp(<Courses />, {
			authors: { authors: mockedAuthors, isAuthorsWithCourseLoaded: true },
			courses: { courses: mockedCourses, isCoursesLoaded: true },
		});

		expect(screen.getAllByTestId('courseCard')).toHaveLength(2);
	});

	it('Component should render course form', () => {
		renderApp(<Courses />, {
			user: { userInfo: { role: 'admin' } },
			authors: { authors: mockedAuthors, isAuthorsWithCourseLoaded: true },
			courses: { courses: mockedCourses, isCoursesLoaded: true },
		});

		expect(screen.getByText('Add new course')).toBeVisible();
	});
});