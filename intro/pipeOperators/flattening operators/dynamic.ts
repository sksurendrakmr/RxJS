import { concatMap, fromEvent, map } from "rxjs";
import { ajax } from "rxjs/ajax";
const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
  .pipe(
    map((event) => endpointInput.value),
    concatMap((value) => ajax(`https://random-data-api.com/api/${value}`))
  )
  .subscribe((value) => console.log(value));
