import { Observable, Subscriber } from 'rxjs';

/**
 * new Obsrvable can be created using new Observable constructor
 * to which we pass the logic of the Observable as a callback
 * function.
 */
const observable$ = new Observable((subscriber) => {
  subscriber.next('Alice');
  subscriber.next('Ben');
});

/**
 * What is this subscriber object?
 * What does this next method do?
 * How can we make this Observable execute this callback?
 */

/**
 * Two more types provided by RxJS
 * 1) Observer Object
 */

const observer = {
  next: (value) => console.log(value),
};

/**
 * next function in Observer provides the behaviour for the
 * next notifications emitted by the Observable.
 */

/**
 * How can we connect our Observer to the Obervable?
 */

//Subscription object
observable$.subscribe(observer);
/**
 * The subscribe method gets called on our Observable that we have created above.
 * At this point, a new subscription is made, which means the callback
 * in the observable run with the provided observer converted into a
 * subscriber object.
 *
 * Each time the next method is used on the subscriber,
 * a next value is emitted and in effect, the next handler of our
 * observer is called with that emitted value.
 *
 * Each new Subscription runs the observable with the provided
 * observer and each emitted value by the Observable will call the
 * Observer's next handler with the provided value.
 */
