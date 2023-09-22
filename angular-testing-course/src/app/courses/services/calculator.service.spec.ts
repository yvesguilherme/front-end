import { TestBed } from '@angular/core/testing';

import { CalculatorService } from "./calculator.service";
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let loggerServiceSpy: any;
  let calculatorService: CalculatorService;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerServiceSpy
        }
      ]
    });

    calculatorService = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    const result = calculatorService.add(2, 2);

    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = calculatorService.subtract(2, 2);

    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});