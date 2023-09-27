import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { asyncScheduler, of, scheduled } from 'rxjs';
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
  let courseService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

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
        courseService = TestBed.inject(CoursesService);
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {
    courseService
      .findAllCourses
      .and
      .returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const materialTab = debugElement.queryAll(By.css('.mdc-tab'));

    expect(materialTab.length).toBe(1, 'Unexpected number of tabs found');
  });


  it("should display only advanced courses", () => {
    courseService
      .findAllCourses
      .and
      .returnValue(of(advancedCourses));

    fixture.detectChanges()

    const materialTab = debugElement.queryAll(By.css('.mdc-tab'));

    expect(materialTab.length).toBe(1, 'Unexpected number of tabs found');
  });


  it("should display both tabs", () => {
    courseService
      .findAllCourses
      .and
      .returnValue(of(setupCourses()));
    
    fixture.detectChanges();

    const materialTab = debugElement.queryAll(By.css('.mdc-tab'));

    expect(materialTab.length).toBe(2, 'Unexpected number of tabs found');
  });


  it("should display advanced courses when tab clicked", (done: DoneFn) => {
    courseService
      .findAllCourses
      .and
      .returnValue(of(setupCourses()));
    
    fixture.detectChanges();

    const materialTab = debugElement.queryAll(By.css('.mdc-tab'));

    click(materialTab[1]);

    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      
      const materialTitle = debugElement.queryAll(By.css('.mat-mdc-card-title'));
      
      console.log(materialTitle);
  
      expect(materialTab.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(materialTitle[0].nativeElement.textContent).toContain('Angular Security Course');

      done();
    }, 500);

  });

});
