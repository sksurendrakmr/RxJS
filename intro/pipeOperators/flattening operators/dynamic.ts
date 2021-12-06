import { catchError, concatMap, EMPTY, fromEvent, map } from "rxjs";
import { ajax } from "rxjs/ajax";
const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
  .pipe(
    map((event) => endpointInput.value),
    concatMap((value) => ajax(`https://random-data-api.com/api/${value}`))
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (error) => console.log(error),
  });

/**
 * ?What would happen if we provide some endpoint which doesn't exist?
 * !If some error occured then it will immediately end our subscription and
 * !after that if you try to fetch the data with correct value, we will not get
 * !anything as the subscription ended.
 *
 * ?How errors are handled by the flattening operators  and how we can use that to handle error?
 *
 * ?What will happen when the inner Observable provided to 'concatMap' operator emits an error.
 * This behaviour presented will be the same for all flattening operators.
 *
 * !When inner Observable's emit error notification then it will reemit the error notification
 * !to the output. Thus, the error will also end the main/outer subscription.
 * !So everything will stop working.
 * !Also the flattening operator will also unsubscribe from the source Observable.
 *
 * ?How can we prevent this error from stopping our main subscription?
 *
 *  */

/**
 * !This approach will not work because when some error occurs
 * !then EMPTY Observale will get subscribe that will emit
 * !complete notification and that will end our subscription
 */
fromEvent(fetchButton, "click")
  .pipe(
    map((event) => endpointInput.value),
    concatMap((value) => ajax(`https://random-data-api.com/api/${value}`)),
    catchError(() => EMPTY)
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (error) => console.log(error),
  });

/**
 * ?How could we change things to hide the error and keep the main (the outer subscription)
 * ?working further.
 *
 * *So even after an error gets emitted by the innser Observable, the main/outer
 * *subscription wouldn't stop and would be able to handle further notifications emitted
 * *by the source Observable.
 *
 * !In flattening operator, if the inner subscription emit complete notification then that
 * !will not send to outer or main subscription.
 *
 * ! So if the concatMap's inner Observable would emit a complete notification,
 * !it wouldn't be passed to the output by concatMap's logic.
 *
 * !So if we would add the same 'catchError' operator configuration as previously but
 * !directly to the inner Observable, we would convert this error to a complete notification
 * !at the level of the inner subscription, so the concatMap will see that the inner subscription
 * !completed instead of emitting an error.
 *
 * !By doing so the main subscription won't receive any error or complete notifications,
 * !so everything will keep on working.
 *
 */

fromEvent(fetchButton, "click")
  .pipe(
    map((event) => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}`).pipe(
        catchError(() => EMPTY)
      )
    )
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (error) => console.log(error),
  });
