/**
 * @packageDocumentation
 * @module fizzbuzz
 */
import { Observable, OperatorFunction } from 'rxjs';
import { mapIfSource } from '@rxjs-ninja/rxjs-utility';

/**
 * The `fizzBuzz` operator takes an observable source of numbers and returns
 * either the number, or if the number is a modulus of `3, 5 and 15` it will instead return `Fizz`,
 * `Buzz` or `FizzBuzz`
 *
 * @example
 * ```ts
 * timer(1000).pipe(fizzbuzz()).subscribe()
 * // 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz
 * ```
 *
 * @returns Observable of a FizzBuzz sequence of numbers
 * @category Fizzbuzz Operators
 */
export function fizzbuzz(): OperatorFunction<number, string | number> {
  return (source: Observable<number>) =>
    source.pipe(
      mapIfSource<number, string, number>(
        (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
        (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
        (value) => value,
      ),
    );
}
