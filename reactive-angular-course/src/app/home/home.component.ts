import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../model/course';

import { CoursesStore } from '../services/stores/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesStore: CoursesStore
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    // const courses$ = this.coursesService.loadAllCourses()
    //   .pipe(
    //     map(courses => courses.sort(sortCoursesBySeqNo)),
    //     catchError(error => {
    //       const message = `Could not load courses: ${error.error.message}`;
    //       this.messagesService.showErrors(message);
    //       console.log(message, error);
    //       return throwError(error);
    //     })
    //   );

    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$);

    // const combinedCourses$ = loadCourses$
    //   .pipe(
    //     share() // Shares the flow between observables.
    //   );

    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');

    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');
  }
}
