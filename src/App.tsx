import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import classes from './app.module.scss';
import {
	mockedCoursesList,
	mockedAuthorsList,
} from './constants/MockedCourses';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
/* eslint-disable */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [isCreateMode, setCreateMode] = useState(false);

	function toggleCreteMode(): void {
		setCreateMode(!isCreateMode);
	}

	function createAuthor(value: string): void {;
		setAuthors([...authors, {name: value, id: uuidv4()}]);
	}
	function createCourse(course: any): void {
		course.id = uuidv4();
		setCourses([...courses, course]);
		setCreateMode(!isCreateMode);
	}

	return (
		<div className={classes.app}>
			<Header />
			{!isCreateMode && (
				<Courses
					courses={courses}
					authors={authors}
					toggleCreteMode={toggleCreteMode}
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
