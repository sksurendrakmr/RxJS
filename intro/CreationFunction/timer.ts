/**
 * 'timer' creation function allows us to create an Observable which will wait
 * sometime, emit a value and complete. (similar to setTimeout function)
 *
 * These Observable produces a new timer for each new subscription.
 */

import { Observable, timer } from "rxjs";

const subscription = timer(2000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  subscription.unsubscribe();
}, 1000);

//mimic
const timer$ = new Observable<number>((subscriber) => {
  const timeoutHandler = setTimeout(() => {
    subscriber.next(0);
    subscriber.complete();
  }, 2000);
  return () => {
    clearTimeout(timeoutHandler);
  };
});

const timerSubscription = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  timerSubscription.unsubscribe();
}, 1000);

/**
 * If the subscription is not active anymore then the notifications won't be passed
 * to the Observer
 */
