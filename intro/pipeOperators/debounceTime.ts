/**
 * !debounceTime -> introduces the time dimension.
 * *It is about debouncing the incoming values.
 *
 * !So if we provide 2 sec. as the debounce time and our
 * !our source observable would emit quickly (say three values).
 * !The debounceTime operator would wait for the emissions to settle
 * !down and after 2 sec. of no new emissions, it would re-emit the latest value.
 *
 *?This is useful for avoid putting excessive pressure on some recalculation logic
 * ?to avoid performance issues or reduce the frequency of HTTP requests sent to the server.
 *
 * !The error and complete notifications are not delayed and are passed through
 * !immediatley in an unchanged form.
 * */

import { debounceTime, fromEvent, map } from "rxjs";

const sliderInput = document.querySelector("input#slider");
fromEvent(sliderInput, "input")
  .pipe(
    debounceTime(2000),
    map((event) => event.target["value"])
  )
  .subscribe((value) => value);
