import { timer } from "rxjs";

fdescribe('Async Testing Examples', () => {
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions...');

      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Asynchronous test example with Jasmine done() and timer from Rxjs', (done: DoneFn) => {
    let test = true;

    timer(1000)
      .subscribe(() => {
        
        test = false;

        expect(test).toBeFalsy();

        done();
      });
  });
});