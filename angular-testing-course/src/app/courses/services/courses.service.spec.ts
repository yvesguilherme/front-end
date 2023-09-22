import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursesService } from "./courses.service";

describe('CoursesService', () => {
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
      ]
    });

    coursesService = TestBed.inject(CoursesService);
  });

  it('should retrieve all courses', () => {

  });
});