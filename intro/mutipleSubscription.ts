/**
 * What would happen if we call the subscribe method on the
 * same Observable multiple times?
 *
 * What difference would it make or will it make any difference
 * if we would pass the same or different Observers as an argument.
 *
 * Answer
 * If we would create one more Subscription to the same Observable and
 * use the sane observer then
 * In this case, the new subscription will run the Observable's logic once
 * more, and it will produce the data, the emissions independently from the first
 * subscription.
 * 
 * As in all, subscribing is about executing the callback inside of the Observable
 * and each Subscription is a separate execution of the Observable. 
 * 
 * With different Observer
 * 
 * The logic inside of the observable would run once more again independently from
 * other executions.
 *But the reaction to the emitted values might be different as we provided the different observer

 Note -> Each new Subscription runs the code embedded in the Observable in the callback
 independently from other subscription.

 So subscribing is just like running a regular function with the Observer object
 passed as an argument.
 */

import { Observable } from "rxjs";

const observable1$ = new Observable<string>((subscriber) => {
  subscriber.next("Surendra");
  setTimeout(() => subscriber.next("Surendra"), 2000);
  setTimeout(() => subscriber.next("Sk"), 2000);
});

console.log("Subscription 1 starts");

observable1$.subscribe((value) => console.log("Subscription 1: ", value));

setTimeout(() => {
  console.log("Subscription 2 starts");
  observable1$.subscribe((value) => console.log("Subscription 2: ", value));
}, 1000);
