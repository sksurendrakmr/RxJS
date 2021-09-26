/**
 * In the case of Cold Observable,each subscription had the
 * values produced independently from other subscriptions.
 *
 * With Hot Observables, all subscription share the same source.
 *
 * This is done by writing the Observable's logic in a way that it just
 * connects to some existing source.
 */

import { Observable } from "rxjs/internal/Observable";

const helloButton = document.querySelector("button#hello");

//we will connect multiple Subscriptions to the same Observable to show how Hot Observables work

const helloClick$ = new Observable<MouseEvent>((subscriber) => {
  helloButton.addEventListener("click", (event: any) => {
    subscriber.next(event);
  });
});

helloClick$.subscribe((event) =>
  console.log("Sub 1: ", event.type, event.x, event.y)
);
helloClick$.subscribe((event) =>
  console.log("Sub 2: ", event.type, event.x, event.y)
);

/**
 * When we subscribe for the first time, the code inside of the
 * Observable is run for the first subscription. This means that a new click event listener
 * is added to our hello button and each event will be emitted as the next notification to the
 * Observer provided for the first subscription
 *
 * Then the second subscribe method run and once again, the Observable's logic is run.
 * This time for the second subscription and once again a click event listener
 * is added and the events will be emitted to the Observer provided for the second subscription.
 *
 *
 * So even though the code inside of the Observable is run independently
 * for each subscription, they receieve the same values at the same time
 * because the actual source of the emissions is the globally available.
 *
 * Hot Observable is the one which has the actual source of the emissions placed outside of it.
 * And the Observable's logic adds another connection to this source.
 *
 * Hot Observables is the one where the actual source of the emissions is comig from the outside of
 * the Observable's logic in a way that each subscription can use the same source as others.
 * */
