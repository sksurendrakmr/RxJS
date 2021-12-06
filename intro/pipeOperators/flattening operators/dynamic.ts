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
