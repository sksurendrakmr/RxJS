/**
 * The Observable created using the 'combineLatest'
 * creation function follows a similar pattern as the
 * 'forkJoin' function but emits the values more often.
 *
 *'combineLatest' also accepts an array of input Observables to which
 it subscribes underneath but the combineLatest logic will emit a new set
 of values each time any of the input observable emits something new.

 Note: CombineLatest needs at least one value from each source to start emitting.

 The most important feature of combineLatest is that it emits an array with
 the latest values from all input observables each time any of them emits something new.

 */

import { combineLatest, fromEvent } from "rxjs";

const temperatureInput = document.getElementById("temperature-input");
const conversionDropdown = document.getElementById("conversion-dropdown");
const resultText = document.getElementById("result-text");

const temperatureInputEvent$ = fromEvent(temperatureInput, "input");
const conversionInputEvent$ = fromEvent(conversionDropdown, "input");

combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
  ([temperatureInputEvent, conversionInputEvent]) => {
    const temperature = Number(temperatureInputEvent.target["value"]);
    const conversion = conversionInputEvent.target["value"];

    let result: number;
    if (conversion === "f-to-c") {
      result = ((temperature - 32) * 5) / 9;
    } else if (conversion === "c-to-f") {
      result = (temperature * 9) / 5 + 32;
    }

    resultText.innerText = String(result);
  }
);
