import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { setupCourses } from '../common/setup-test-data';
import { COURSES } from '../../../../server/db-data';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display the course list", () => {
    component.courses = setupCourses();

    fixture.detectChanges();
    // console.log(debugElement.nativeElement.outerHTML);

    const listCards = debugElement.queryAll(By.css('.course-card'));

    expect(listCards).toBeTruthy('Could not find cards');
    expect(listCards.length).toBe(12, 'Unexpected number of courses');
  });


  it("should display the first course", () => {

    pending();

  });


});
