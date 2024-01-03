import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { CourseEntityService } from '../services/course-entity.service';
import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private courseEntityService: CourseEntityService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.beginnerCourses$ = this.courseEntityService
      .entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );

    this.advancedCourses$ = this.courseEntityService
      .entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = this.courseEntityService
      .entities$
      .pipe(
        map(courses => courses.filter(course => course.promo).length)
      );
  }

  scrollPage(): void {
    const scrollTarget = this.elementRef.nativeElement;
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onAddCourse(): void {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
