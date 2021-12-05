/**
 * allows us to cause some side effects without interacting
 * with the notifications.
 *
 * It is useful if we have multiple operators stacked and
 * we would like to be able to observe notifications at any
 * stage of this operator's pipeline.
 *
 * It doesn't influence the notifications in any way.So
 * all notifications will be reemitted to the output in
 * an unchanged form.
 *
 * It will just allow us to run some side effects for each
 * notification.
 */

import { filter, map, of, tap } from "rxjs";

of(1, 2, 7, 3, 6, 14)
  .pipe(
    tap((value) => console.log(value)),
    filter((value) => value > 5),
    tap((value) => console.log(value)),
    map((value) => value * 2)
  )
  .subscribe((value) => console.log(value));
