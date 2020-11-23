/**
 * @packageDocumentation
 * @module fizzbuzz
 */

import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, skip, takeWhile, tap } from 'rxjs/operators';
import { mapIfSource } from '@rxjs-ninja/rxjs-utility';

/**
 * The `fromFizzbuzz` operator is used to create an observable [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz)
 * sequence.
 *
 * @param iterations The number of iterations to emit
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * ```ts
 * fromFizzbuzz(15).pipe(tap(console.log)).subscribe()
 * // 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz
 * ```
 *
 * @returns Observable of a FizzBuzz sequence of numbers
 * @category Fizzbuzz Observables
 */
export function fromFizzbuzz(iterations: number, emitDelay = 0): Observable<string | number> {
  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile((value) => !subscriber.closed && value < iterations),
        skip(1),
        mapIfSource<number, string, number>(
          (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
          (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
          (value) => value,
        ),
        tap((value) => subscriber.next(value as any)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
