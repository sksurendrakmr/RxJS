/**
 * concetMap : - map the emitted values into another Observable
 */

import { concatMap, Observable, of } from "rxjs";

const source$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next("A");
  }, 2000);
  setTimeout(() => {
    subscriber.next("B");
  }, 5000);
});

/**
 * *Source$ observable will emits value 'A' after two seconds.
 * *The next notification will reach the concatMap flattening operator
 * *and at this point concatMap logic will run the function we provide and generate
 * * a new inner Observable to which the concatMap operator will subscribe underneath.
 *
 * *So in our case, concatMap's logic will subscribe to the Observable created using
 * *'of' operator and the value emitted by the inner subscription to this inner Observable will then
 * * be flattened to the output.
 */
source$
  .pipe(concatMap((value) => of(1, 2)))
  .subscribe((value) => console.log(value));
