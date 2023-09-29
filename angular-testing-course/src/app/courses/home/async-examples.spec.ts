import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { timer } from "rxjs";

fdescribe('Async Testing Examples', () => {

  let test: boolean;

  beforeEach(() => {
    test = false;
  });

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    setTimeout(() => {
      // console.log('running assertions...');

      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Asynchronous test example with Jasmine done() and timer from Rxjs', (done: DoneFn) => {
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

  fit('Asynchronous test example - plain Promise', fakeAsync(() => {
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
});