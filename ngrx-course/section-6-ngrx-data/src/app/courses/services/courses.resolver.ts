import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterState } from "@angular/router";

import { CourseEntityService } from "./course-entity.service";

import { Observable, of } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
export function coursesResolver(route: ActivatedRouteSnapshot, state: RouterState): Observable<boolean> {
  const coursesService = inject(CourseEntityService);

  return coursesService.loaded$
    .pipe(
      tap(loaded => {
        if (!loaded) {
          coursesService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );

  // return coursesService.getAll()
  //   .pipe(
  //     map(courses => !!courses)
  //   );
}