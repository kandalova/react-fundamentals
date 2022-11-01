import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
	const courses = useContext(CoursesContext);

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
				<Link to={'/courses/add'}>
					<Button text={ADD_COURSE_BUTTON_TEXT} />
				</Link>
			</div>
			<div className={classes.courseList}>
				{memoizedCourseList.map((item: ICourse) => (
					<CourseCard key={item.id} course={item} />
				))}
			</div>
		</div>
	);
}
