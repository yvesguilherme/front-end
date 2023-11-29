import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";


export const CourseResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const courseStore = inject(Store<AppState>);
    let loading = false;

    return courseStore
      .pipe(
        tap(() => {
          if (!loading) {
            loading = true;
            courseStore.dispatch(loadAllCourses());
          }
        }),
        first(),
        finalize(() => loading = false)
      );
  };