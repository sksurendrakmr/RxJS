/**
 * Execution Timing - Empty Observable
 * i.e. after we subscribe to it, it won't emit any notification.
 */

import { Observable } from "rxjs";

const emptyObervable$ = new Observable((subscriber) => {
  console.log("Observable executed");
});

console.log("Before subscribe");
emptyObervable$.subscribe();
console.log("After subscribe");

/**
 * o/p
 * Before subscribe
 * Observable executed
 * After subscribe
 *
 * Note : - The subscribe method immediately runs the logic inside of
 * the observable. It's not asynchronous or delayed in anyway.
 *
 */

/**
 * Emit single values i.e. emitting a single next notification.
 */

const observableWithAValue$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Hey!");
});

const observer = {
  next: (value) => console.log(value),
};
observableWithAValue$.subscribe(observer);
//or
console.log("Before subscribe");
observableWithAValue$.subscribe((value) => console.log(value));
console.log("After subscribe");

/**
 * o/p
 * Before subscribe
 * Observable executed
 * Hey!
 * After subscribe
 */

/**
 * Asynchronous Emission
 */

const asynchronousObservable$ = new Observable((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Surendra");
  subscriber.next("Kumar");
  setTimeout(() => {
    subscriber.next("Hey");
  }, 2000);
});

console.log("Before subscribe");
asynchronousObservable$.subscribe((value) => console.log(value));
console.log("After subscribe");

/**
 * o/p
 * Before subscribe
 * Observable executed
 * Surendra
 * Kumar
 * After subscribe
 * Hey
 *
 * Note : - An Observable can emits notifications in both, synchronous and asynchronous way.
 */

/**
 * Teardown - Complete Notification
 * Will emit complete notification after emitting the third value
 *
 * Teardown logic can be used by observable to clean up after itself
 * to prevent memory leaks or to provide cancellation logic.
 *
 * So Teardown logic is the place to provide the behavior for the clean up and
 * cancellation.
 * RxJS provide a way to cancel ongoing processes that were initiaized by the observable.
 */

const teardownObervable$ = new Observable((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Surendra");
  subscriber.next("Kumar");
  setTimeout(() => {
    subscriber.next("Hey");
    subscriber.complete();
  }, 2000);
  //teardown logic
  return () => {
    console.log("Teardown");
  };
});

const teardownObserver = {
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
};

//teardown logic

teardownObervable$.subscribe(teardownObserver);

/**
 * Error notification
 */

const errorObervable$ = new Observable((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Surendra");
  subscriber.next("Kumar");
  setTimeout(() => {
    subscriber.next("Hey");
  }, 2000);
  setTimeout(() => {
    subscriber.error(new Error("Some error occured"));
  }, 4000);
});

const errorObserver = {
  next: (value) => console.log(value),
  error: (e) => console.log(e),
};

errorObervable$.subscribe(errorObserver);

/**
 * Order
 */

const orderObervable$ = new Observable((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Surendra");
  subscriber.next("Kumar");
  setTimeout(() => {
    subscriber.error(new Error("Some error occured"));
  }, 4000);
  setTimeout(() => {
    subscriber.next("Hey");
    subscriber.complete();
  }, 2000);
  return () => {
    console.log("tearDown");
  };
});

const orderObserver = {
  next: (value) => console.log(value),
  error: (e) => console.log(e),
  complete: () => console.log("Complete"),
};
console.log("Before subscribe");
orderObervable$.subscribe(orderObserver);
console.log("After subscribe");

/**
 * o/p
 * Before subscribe
 * Observable executed
 * Surendra
 * Kumar
 * After subscribe
 * Some error occured
 * tearDown
 *
 * Error notification ends the subscription
 *
 * The intermediate subscriber object, created automatically by RxJS,
 * checks whether the subscription is still active before passing the notification
 * to the Observer.
 *
 * Subscriber object works like a safety fuse and ensures that Observable and subscription
 * always works the they design
 */

/**
 * Unsubscribing
 */

const intervalObservable$ = new Observable((subscriber) => {
  let count: number = 0;
  const intervalId = setInterval(() => {
    subscriber.next(count++);
  }, 2000);
  return () => {
    clearInterval(intervalId);
    console.log("TearDown");
  };
});

console.log("Before subscribe");
const subscription = intervalObservable$.subscribe(orderObserver);
console.log("After subscribe");

setTimeout(() => {
  subscription.unsubscribe();
}, 7000);
