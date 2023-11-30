import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./course.selectors";


export const CourseResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const courseStore = inject(Store<AppState>);
    let loading = false;

    return courseStore
      .pipe(
        select(areCoursesLoaded),
        tap(coursesLoaded => {
          if (!loading && !coursesLoaded) {
            loading = true;
            courseStore.dispatch(loadAllCourses());
          }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => loading = false)
      );
  };