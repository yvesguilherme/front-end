import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of, timer } from "rxjs";
import { delay } from "rxjs/operators";

describe('Async Testing Examples', () => {

  let test: boolean;

  beforeEach(() => {
    test = false;
  });

  it('Asynchronous test example - with Jasmine done()', (done: DoneFn) => {
    setTimeout(() => {
      // console.log('running assertions...');

      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Asynchronous test example - with Jasmine done() and timer from Rxjs', (done: DoneFn) => {
    timer(1000)
      .subscribe(() => {

        test = false;

        expect(test).toBeFalsy();

        done();
      });
  });

  it('Asynchronous test example - setTimeout() with tick()', fakeAsync(() => {
    setTimeout(() => test = true, 1000);

    tick(1000);

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - setTimeout() with flush()', fakeAsync(() => {
    setTimeout(() => test = true, 1000);
    setTimeout(() => { });
    setTimeout(() => { }, 5000);

    flush();

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    console.log('Creating promise...');

    Promise
      .resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully...');

        // test = true;

        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then() evaluated successfully...');

        test = true;
      });

    flushMicrotasks();

    console.log('Running test assertions...');

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;

        setTimeout(() => counter++, 1000);
      });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    console.log(`Creating Observable...`);

    const test$ = of(test)
      .pipe(
        delay(1000)
      );

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log(`Running test assertions...`);

    expect(test).toBeTruthy();

  }));
});