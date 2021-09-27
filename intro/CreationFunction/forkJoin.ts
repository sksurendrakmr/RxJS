/**
 * forkJoin accepts other Observables as the source as the input.
 * we can pass array of Observables to it.
 *
 * Once we subscribe to it, underneth it will create subscriptions to all
 * provided input Observables. Then it will wait for all these Observables to complete
 * and once this happens, it will emit a set of the latest values from all of them.
 *
 * Useful when we would like to call multiple HTTP endpoints at the same point and wait for all
 * them to respond before taking futher action.
 */

import { forkJoin, Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";

const randomName$ = ajax<any>(
  "https://random-data-api.com/api/name/random_name"
);

const randomNation$ = ajax<any>(
  "https://random-data-api.com/api/name/random_nation"
);

const randomFood$ = ajax<any>(
  "https://random-data-api.com/api/name/random_food"
);

randomName$.subscribe((ajaxResponse) =>
  console.log(ajaxResponse.response.first_name)
);
randomNation$.subscribe((ajaxResponse) =>
  console.log(ajaxResponse.response.capital)
);
randomFood$.subscribe((ajaxResponse) =>
  console.log(ajaxResponse.response.dish)
);

/**
 * it will make three HTTP calls, emit an array with all the responses in the
 * correct order, once all the HTTP calls respond
 */
forkJoin([randomName$, randomNation$, randomFood$]).subscribe((ajaxResponses) =>
  console.log(ajaxResponses)
);

//destructuring the response
forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
  ([nameAjax, nationAjax, foodAjax]) =>
    console.log(
      `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}`
    )
);

//Error scenarios with forkJoin

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next("A");
    subscriber.complete();
  }, 3000);
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error("Failure");
    subscriber.complete();
  }, 5000);
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log(err),
});
//o/p -> Failure
/**
 * If any of the forkJoin input Observable fail, it would cancel all other observable(all other observable unsubscribed)
 */
