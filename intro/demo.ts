import { Observable } from "rxjs";

//type of the emitted values
const observable$ = new Observable<string>((subscriber) => {
  subscriber.next("Surendra");
  subscriber.next("Suri");
  subscriber.next("Sk");
});
//defined the logic of our observable. It will simply
//generate three values, one after another.

/**
 * We need to subscribe to the Observable to run the logic
 * inside of the Observable.
 */

observable$.subscribe();
/**
 * By running the above statement, the logic inside the
 * Observable will be executed but still noting happend even though
 * we emitted three values.
 * Because right now, we don't do anything with these values.
 *
 * To provide some reaction, we need to create some handler for those next notifications
 */

//creating an Observer object which would have this handler specified
const observer = {
  next: (value) => console.log(value),
};

observable$.subscribe(observer);

//we are passing an observer to the subscribes method to execute
//the observable's logic with our new Observer

/**
 * When we subscribe with an Observer Object, our Observer get
 * wrapped into a subscriber object and this is done to provide some of the
 * Observable interface guarantees like not delivering notifications after the
 * subscription gets closed or providing default handlers for the notification types
 * which are not covered by our Observer.
 *
 * In more simpler word, It's a transparent step which makes the Observable
 * more predictable and easier to use.
 */

/**
 * If we only use next notification, then it's best to use the shortand version.
 * Instead of passing the whole Observer object, we could like
 */

observable$.subscribe({
  next: (value) => console.log(value),
});

//more shortand way
observable$.subscribe((value) => console.log(value));
//the function inside the subscribe method act as the notification handler.

/**
 * Unsubscribing to Observable
 * If we are no longer interested in receiving values from the observable,
 * we should unsubscribe.
 */

const observable1$ = new Observable<string>((subscriber) => {
  subscriber.next("Surendra");
  setTimeout(() => subscriber.next("Surendra"), 2000);
  setTimeout(() => subscriber.next("Sk"), 2000);
});

const subscription = observable1$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 3000);
