import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';

import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';

import { Lesson } from '../model/lesson';
import { Course } from '../model/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;
  loading$: Observable<boolean>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.courseEntityService.entities$
      .pipe(
        map(courses => courses.find(course => course.url === courseUrl))
      );

    this.lessons$ = this.lessonEntityService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(
          ([lessons, course]) => lessons
            .filter(lesson => lesson.courseId === course.id)
        )
      );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course): void {
    this.lessonEntityService.getWithQuery({
      courseId: String(course.id),
      pageNumber: String(this.nextPage),
      pageSize: '3'
    });

    this.nextPage += 1;
  }

}