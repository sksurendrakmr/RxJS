/**
 * Observable created using 'of' function works like
 * a function with multiple return values. So it will emit all
 * provided values immediately when calling the subscribe method and then
 * complete.
 */

import { Observable, of } from "rxjs";

of("Alice", "Ben", "Charlie").subscribe((value) => console.log(value));

of("Alice", "Ben", "Charlie").subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
});

//Observable implemention of 'of()'
const name$ = new Observable<string>((subscriber) => {
  subscriber.next("Alice");
  subscriber.next("Ben");
  subscriber.next("Charlie");
  subscriber.complete();
});

name$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
});

/**
 * How creation function work
 */

function ourOwnOf(...args: string[]): Observable<string> {
  return new Observable<string>((subscriber) => {
    args.forEach((arg: string) => {
      subscriber.next(arg);
    });
    subscriber.complete();
  });
}
