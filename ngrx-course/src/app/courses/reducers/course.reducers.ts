import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import { Course, compareCourses } from "../model/course";
import { CourseActions } from "../course-action-types";

export interface CourseState extends EntityState<Course> {

}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const inititalCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  inititalCourseState,
  on(
    CourseActions.allCoursesLoaded,
    (state, action) => adapter.setAll(action.courses, state)
  )
);

export const { selectAll } = adapter.getSelectors();