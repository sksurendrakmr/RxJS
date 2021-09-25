/**
 * Marbles diagram
 * It represents the passing time after we subscribe
 * to an Observable.
 *
 * As long as the subscription is active, we might expect some
 * emissions to happen.
 */

/**
 *If we would like to signal that the Observable's data
 source has finished and there are no more values to be emitted,
 we would use the complete notification.

 After a complete notification gets emitted, its means that the
 Observable has finished its work, will not emit any more values and the
 subscription will end automatically.

 Complete notification can be emitted only once.
 */

/**
 * Error notification
 * Whenever something unexpected happens or the observable
 * wants to signal that its data source failed, the error notification
 * is emitted
 * It also ends the subscription, so there can be one error
 * error subscription at most and is alway going to be the last one.
 *
 * Error notificaiton can carry a payload so its possible to pass some value
 * describing the error.
 *
 * If some unhandled javascript error would happens inside of the
 * Observable, it would automatically emitted as an error notification
 */
