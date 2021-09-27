/**
 * from creation function
 * It used to convert other types into an Observable.
 * E.g. It can convert an array into an Observable.
 *
 *  Another use cases is to create an Observable from promise. Once we subscribe to
 * such Observable, the Promise's resolve value will be emitted as a next notification
 * and then it will complete. If the promise gets rejected, the Observable will emit an error notification.
 *
 *from can also create Observable from other sources like iterables (generator functions)
 *and other Observable like object.
 */

import { from } from "rxjs";

/**
 * from function with array
 * similar to of() creation function but instead of passing separate arguments,
 * with from() we will pass an array
 *
 * The below code will immediately emits all values provided in the array as separate
 * next notification and then completes.
 *
 * using the from() with an array passed to it, creates a Cold Observable which emits values and completes every time we
 * subscribe to it.
 */
from(["Alice", "Ben", "Charlie"]).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("complete"),
});

/**
 * converting promise into an Observable
 * Why?
 * Useful when we already have some code or API exposed as a promise and
 * we would like to use this promise in Observable world to be able to use all of the tools provided
 * by RxJS as a part of more complex asynchronous code or to combine with other Observable.
 */
const somePromise = new Promise((resolve, reject) => {
  resolve("Resolved");
  //   reject("Rejected!");
});

/**
 * The newly created Observable's logic will use 'then' method on the promise
 * once we subscribe to it and emit its resolve value once its available as a next
 * notification and then complete.
 */
const ObservableFromPromise$ = from(somePromise);
ObservableFromPromise$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error:", err),
  complete: () => console.log("Completed"),
});

/**
 * Observable created using the 'from()' with a promise passed to it uses
 * 'then' and 'catch' methods on the promise and then passes the resolved value or rejection error
 * as next or error notification.
 */
