import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";

import { Course } from "../model/course";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course>{
  constructor(protected httpClient: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Course', httpClient, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.httpClient.get('/api/courses')
      .pipe(
        map(courses => courses['payload'])
      );
  }
}