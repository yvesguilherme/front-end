import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";

import { Course } from "../model/course";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  @Output() scrollPage = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private courseEntityService: CourseEntityService
  ) { }

  editCourse(course: Course): void {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Edit Course",
      course,
      mode: 'update'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());

  }

  onDeleteCourse(course: Course): void {
    this.courseEntityService.delete(course);
    this.scrollPage.emit();
  }

}
