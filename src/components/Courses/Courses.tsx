import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { ADD_COURSE_BUTTON_TEXT } from '../../constants/constants';
import { ICourse } from '../../helpers/appTypes';
import { checkStringIncludes } from '../../helpers/checkStringIncludes';
import { selectCourses } from '../../store/courses/coursesSelector';
import { CourseCard } from './components/CourseCard/CourseCard';
import { ISearchPayload, SearchBar } from './components/SearchBar/SearchBar';

import classes from './courses.module.scss';

export function Courses() {
	const [searchValue, setSearchValue] = useState<string>('');
	const courses = useSelector(selectCourses);

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
				<SearchBar
					onSearch={({ search }: ISearchPayload) => setSearchValue(search)}
				/>
				<Link to={'/courses/add'}>
					<Button text={ADD_COURSE_BUTTON_TEXT} />
				</Link>
			</div>
			{courses.length && (
				<div className={classes.courseList}>
					{memoizedCourseList.map((item: ICourse) => (
						<CourseCard key={item.id} course={item} />
					))}
				</div>
			)}
			{!courses.length && <div>No courses finded</div>}
		</div>
	);
}
