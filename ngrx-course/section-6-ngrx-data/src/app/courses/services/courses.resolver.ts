import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterState } from "@angular/router";

import { CourseEntityService } from "./course-entity.service";

import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
export function coursesResolver(route: ActivatedRouteSnapshot, state: RouterState): Observable<boolean> {
  const coursesService = inject(CourseEntityService);

  return coursesService.getAll()
    .pipe(
      map(courses => !!courses)
    );
}