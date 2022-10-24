import React, { useState } from 'react';

import { Button } from '../../common/Button/Button';
import { ADD_COURSE_BUTTON_TEXT } from '../../constants/constants';
import { checkStringIncludes } from '../../helpers/checkStringIncludes';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

import classes from './courses.module.scss';

interface ICourses {
	courses: Array<any>;
	authors: Array<any>;
	toggleCreteMode: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Courses({ courses, authors, toggleCreteMode }: ICourses) {
	const [searchValue, setSearchValue] = useState('');

	function onSearch(value: string): void {
		setSearchValue(value);
	}

	function getCoursesList(): Array<any> {
		const reduced = courses.reduce((filtered, course) => {
			const isInclude =
				checkStringIncludes(course.title, searchValue) ||
				checkStringIncludes(course.id, searchValue);

			if (isInclude) {
				const cardItem = (
					<CourseCard key={course.id} course={course} authors={authors} />
				);
				filtered.push(cardItem);
			}
			return filtered;
		}, []);

		return reduced;
	}

	const courseList = getCoursesList();

	return (
		<div className={classes.courses}>
			<div className={classes.header}>
				<SearchBar onSearch={onSearch} />
				<Button text={ADD_COURSE_BUTTON_TEXT} onClick={toggleCreteMode} />
			</div>
			<div className={classes.courseList}>
				{/* {courses.map((item) => (
					<CourseCard key={item.id} course={item} authors={authors} />
				))} */}
				{courseList}
			</div>
		</div>
	);
}
