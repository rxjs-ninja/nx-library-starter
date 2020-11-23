import { observe } from 'rxjs-marbles/jest';
import { reduce, tap } from 'rxjs/operators';
import { fromFizzbuzz } from '@rxjs-ninja/example-lib';

describe('fromFizzbuzz', () => {
  it(
    'should create observable fibonacci sequence number up to the max number of iterations',
    observe(() =>
      fromFizzbuzz(20, 0).pipe(
        reduce(
          (acc, val) =>
            typeof val === 'number'
              ? { ...acc, number: [...acc.number, val] }
              : {
                  ...acc,
                  string: [...acc.string, val],
                },
          { number: [], string: [] },
        ),
        tap((value) => expect(value.string).toHaveLength(8)),
      ),
    ),
  );
});
