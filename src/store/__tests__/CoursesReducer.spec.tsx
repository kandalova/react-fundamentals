import { courses } from '../courses/coursesReducer';
import { courseAdded } from '../courses/coursesActions';

describe('Courses Reducer', () => {
	const newCourse = {
		id: '1',
		title: 'title',
		description: 'desc',
		creationDate: 'date',
		duration: 2,
		authors: [],
	};
	it('should return the initial state', () => {
		expect(courses(undefined, {})).toEqual([]);
	});

	it('should add new course to an empty list', () => {
		expect(courses([], courseAdded(newCourse))).toEqual([newCourse]);
	});

	it('should add new course to an an existing list', () => {
		const oldCourse = {
			id: '2',
			title: 'title',
			description: 'desc',
			creationDate: 'date',
			duration: 2,
			authors: [],
		};
		expect(courses([oldCourse], courseAdded(newCourse))).toEqual([
			oldCourse,
			newCourse,
		]);
	});
});
