import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CoursesContext } from '../../api/courses';
import { Button } from '../../common/Button/Button';
import { ADD_COURSE_BUTTON_TEXT } from '../../constants/constants';
import { ICourse } from '../../helpers/appTypes';
import { checkStringIncludes } from '../../helpers/checkStringIncludes';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

import classes from './courses.module.scss';

export function Courses() {
	const [searchValue, setSearchValue] = useState<string>('');
	const navigate = useNavigate();
	const courses = useContext(CoursesContext);

	function addCourse(): void {
		navigate('/courses/add');
	}

	function getCoursesList(courses: ICourse[], searchValue: string): ICourse[] {
		return courses.filter((course) => {
			return (
				checkStringIncludes(course.title, searchValue) ||
				checkStringIncludes(course.id, searchValue)
			);
		});
	}

	const memoizedCourseList = useMemo(
		() => getCoursesList(courses, searchValue),
		[courses, searchValue]
	);

	return (
		<div className={classes.courses}>
			<div className={classes.header}>
				<SearchBar onSearch={(value) => setSearchValue(value)} />
				<Button text={ADD_COURSE_BUTTON_TEXT} onClick={addCourse} />
			</div>
			<div className={classes.courseList}>
				{memoizedCourseList.map((item: ICourse) => (
					<CourseCard key={item.id} course={item} />
				))}
			</div>
		</div>
	);
}
