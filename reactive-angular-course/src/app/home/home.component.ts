import { Component, OnInit } from '@angular/core';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, share, shareReplay, tap } from 'rxjs/operators';

import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError(error => {
          const message = `Could not load courses: ${error.error.message}`;
          this.messagesService.showErrors(message);
          console.log(message, error);
          return throwError(error);
        })
      );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$);

    const combinedCourses$ = loadCourses$
      .pipe(
        share() // Shares the flow between observables.
      );

    this.beginnerCourses$ = combinedCourses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = combinedCourses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );
  }
}
