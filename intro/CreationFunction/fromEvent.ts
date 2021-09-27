/**
 * fromEvent creation function
 * The fromEvent creation function allows us to create an Observable
 * from various event sources.
 *
 * It supports multiple event targets, including the DOM event targets,
 * the Node.js event emitter and even Jquery events.
 *
 * This is useful to create an Observable which will emit events each time
 * the user click on a button, inputs something into a form field or resizes the window.
 *
 * The Obervable made with 'formEvent' never complete, so we need to
 * expilcitly unsubscribe from them to stop receiving the events.
 *
 * Observable created using the 'formEvent' is Hot. This is because the
 * actual source/producer of the data is placed outside of the Observable itself.
 *
 * In our case, the source is DOM element and click event is emitted by it.
 *So each time we subscribe to the formEvent Observable, addEventListener is run underneth
 connecting it to a common source. 
 */

import { fromEvent, Observable } from "rxjs";
const triggerButton = document.querySelector("button#trigger");

/**
 * This statement create an Observable which will emit the events when we click
 * on our 'Trigger' button.
 */
fromEvent(triggerButton, "click");

const subscription = fromEvent<MouseEvent>(triggerButton, "click").subscribe(
  (event) => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

//mimic of formEvent Implementation
const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
  const clickHandler = (event: any) => {
    subscriber.next(event);
  };
  triggerButton.addEventListener("click", clickHandler);
  return () => {
    triggerButton.removeEventListener("click", clickHandler);
  };
});

const triggerClickSubscription = triggerClick$.subscribe((event) =>
  console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  triggerClickSubscription.unsubscribe();
}, 5000);
