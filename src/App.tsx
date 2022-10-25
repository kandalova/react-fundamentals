import React, { useState } from 'react';

import { Header } from './components/Header/Header';
import {
	mockedCoursesList,
	mockedAuthorsList,
} from './constants/MockedCourses';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';

import { v4 as uuidv4 } from 'uuid';
import classes from './app.module.scss';

function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [isCreateMode, setCreateMode] = useState(false);

	function toggleCreateMode(): void {
		setCreateMode(!isCreateMode);
	}

	function createAuthor(value: string): void {
		setAuthors([...authors, { name: value, id: uuidv4() }]);
	}
	function createCourse(course: any): void {
		course.id = uuidv4();
		setCourses([...courses, course]);
		setCreateMode(false);
	}

	return (
		<div className={classes.app}>
			<Header />
			{!isCreateMode && (
				<Courses
					courses={courses}
					authors={authors}
					toggleCreateMode={toggleCreateMode}
				/>
			)}
			{isCreateMode && (
				<CreateCourse
					createCourse={createCourse}
					createAuthor={createAuthor}
					authors={authors}
				/>
			)}
		</div>
	);
}

export default App;
