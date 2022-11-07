import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthors } from '../../api/authors';
import { getCourses } from '../../api/courses';

import { Button } from '../../common/Button/Button';
import { ADD_COURSE_BUTTON_TEXT } from '../../constants/constants';
import { ICourse } from '../../helpers/appTypes';
import { checkStringIncludes } from '../../helpers/checkStringIncludes';
import { authorsLoaded } from '../../store/authors/authorsActions';
import { coursesLoaded } from '../../store/courses/coursesActions';
import { selectCourses } from '../../store/courses/coursesSelector';
import { CourseCard } from './components/CourseCard/CourseCard';
import { ISearchPayload, SearchBar } from './components/SearchBar/SearchBar';

import classes from './courses.module.scss';

export function Courses() {
	const [searchValue, setSearchValue] = useState<string>('');
	const courses = useSelector(selectCourses);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getCourses()
			.then((courses) => dispatch(coursesLoaded(courses)))
			.then(() => getAuthors())
			.then((authors) => dispatch(authorsLoaded(authors)))
			.finally(() => {
				setLoading(false);
			});
	}, []);

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
			{!loading && courses.length && (
				<div className={classes.courseList}>
					{memoizedCourseList.map((item: ICourse) => (
						<CourseCard key={item.id} course={item} />
					))}
				</div>
			)}
			{!loading && !courses.length && <div>No courses finded</div>}
		</div>
	);
}
