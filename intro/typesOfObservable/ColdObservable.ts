import { ajax } from "rxjs/ajax";

/**
 * ajax function provided by rxjs
 * ajax() is a helper function provided by RxJS.
 * Such helper functions are called Creation functions or
 * creation Operators.
 *
 * ajax() function will create an observable which will send
 * an HTTP request to the endPoint provided as argument.
 *
 * This creattion functions will create new Observable for us, so we
 * don't have to use the 'new Observable' constructor and provide the whole
 * logic every time we would like to create a new Observable.
 *
 */

const httpObservable$ = ajax<any>(
  "https://random-data-api.com/api/name/random_name"
);

httpObservable$.subscribe((data) =>
  console.log("Sub 1: ", data.response.first_name)
);
httpObservable$.subscribe((data) =>
  console.log("Sub 2: ", data.response.first_name)
);
httpObservable$.subscribe((data) =>
  console.log("Sub 3: ", data.response.first_name)
);
/**
 * If we subscribe to the above observable multiple times, each subscription
 * should make separate HTTP calls.
 *
 * So this is a cold observable.
 *
 * As it produced a new source of emissions (a new HTTP request for each subscription)
 *
 */
