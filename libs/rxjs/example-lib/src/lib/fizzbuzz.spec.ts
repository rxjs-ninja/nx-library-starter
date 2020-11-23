import { marbles } from 'rxjs-marbles/jest';
import { fizzbuzz } from '@rxjs-ninja/example-lib';

describe('fizzbuzz', () => {
  it(
    'should return Fizz for 3, Buzz for 5, FizzBuzz for 15 or number if any other number',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-g-|', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 15, g: 16 });
      const subs = '^--------------!';
      const expected = m.cold('-t-u-v-w-x-y-z-|', { t: 1, u: 2, v: 'Fizz', w: 4, x: 'Buzz', y: 'FizzBuzz', z: 16 });
      m.expect(input.pipe(fizzbuzz())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
