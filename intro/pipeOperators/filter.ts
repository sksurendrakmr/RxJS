/**
 * If a value gets emitted by the source, this operator will either pass
 * it through to the output or not based on the condition we provide to it.
 *
 *
 */

import { filter, Observable } from "rxjs";

type NewsItem = {
  category: "Business" | "Sports";
  content: string;
};

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "A" });
  }, 1000);
  setTimeout(() => {
    subscriber.next({ category: "Sports", content: "B" });
  }, 3000);
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "C" });
  }, 4000);
  setTimeout(() => {
    subscriber.next({ category: "Sports", content: "D" });
  }, 6000);
  setTimeout(() => {
    subscriber.next({ category: "Business", content: "E" });
  }, 7000);
}).pipe(filter((value) => value.category === "Sports"));

newsFeed$.subscribe((value) => console.log(value));
