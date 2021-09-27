/**
 * similar to setInterval function
 *
 * It's a cold Observable. so each new subscription will
 * produce its own interval instance.
 */

import { interval, Observable } from "rxjs";

const subscription = interval(1000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("completed!"),
});
//o/p => 0,1,2,3,4,5,...
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

//mimic
const interval$ = new Observable<number>((subscriber) => {
  let count = 0;
  const intervalHandler = setInterval(() => {
    subscriber.next(count++);
  }, 1000);

  return () => {
    clearInterval(intervalHandler);
  };
});

const intervalSubscription = interval$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  intervalSubscription.unsubscribe();
}, 5000);
