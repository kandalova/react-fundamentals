import React, { useMemo, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { ADD_COURSE_BUTTON_TEXT } from '../../constants/constants';
import { IAuthor, ICourse } from '../../helpers/appTypes';
import { checkStringIncludes } from '../../helpers/checkStringIncludes';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

import classes from './courses.module.scss';

interface ICourses {
	courses: Array<ICourse>;
	authors: Array<IAuthor>;
	toggleCreateMode: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Courses({ courses, authors, toggleCreateMode }: ICourses) {
	const [searchValue, setSearchValue] = useState<string>('');

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
				<Button text={ADD_COURSE_BUTTON_TEXT} onClick={toggleCreateMode} />
			</div>
			<div className={classes.courseList}>
				{memoizedCourseList.map((item) => (
					<CourseCard key={item.id} course={item} authors={authors} />
				))}
			</div>
		</div>
	);
}
