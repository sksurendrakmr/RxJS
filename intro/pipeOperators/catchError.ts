/**
 * !It can be used to provide a fallback source in case the original source failed.
 * ?So this operator won't change the emitted values and complete notification.
 * ?It will just pass them through in an unchanged form.
 *
 * !This operator is interested in the error notification only.
 *
 * !catchError allows us to to provide a fallback Observable which will be used
 * !in case the original source emits an error. If that would happen,
 * !the catchError's logic would not reemit that error but subscribe to the
 * !provided fallback Observable instead.
 *
 * !And all notifications received by this new inner subscription will be passed to the
 * !output.
 *
 * !catchError accepts a function to which the error's payload will be passed and this
 * !function should return an Observable which will be used once an error reaches this 'catchError' operator.
 */

/**
 * !Empty observable => once we subscribe to it, it doesn't emit any values.
 * !It will immediately completed instead.
 *
 * ?useful if we want to hide the error notification from our observer but not want to provide any fallback.
 */

import { catchError, EMPTY, Observable, of } from "rxjs";

const failingHttpRequest$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error(new Error("Timeout"));
  }, 2000);
});

failingHttpRequest$
  .pipe(catchError((error) => of("Fallback value")))
  .subscribe((value) => console.log(value));

/**
 * *Sometimes we don't want to provide any fallback if something fails.
 * *Instead we would like to catch the error and not show anything.
 *
 * !using 'catchError' operator
 *
 * *sometimes we just want to hide the error from the source so it won't cause
 * * unhandled errors in the console.
 */

failingHttpRequest$
  .pipe(catchError((error) => EMPTY))
  .subscribe((value) => console.log(value));
