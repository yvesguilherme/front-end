import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CoursesModule } from '../courses.module';
import { HomeComponent } from './home.component';
import { CoursesService } from '../services/courses.service';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: CoursesService,
          useValue: jasmine.createSpyObj('CourseService', ['findAllCourses'])
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {

    pending();

  });


  it("should display only advanced courses", () => {

    pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});
