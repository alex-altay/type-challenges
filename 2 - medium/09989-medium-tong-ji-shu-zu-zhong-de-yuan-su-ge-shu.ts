// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'
type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]


// ============= Your Code Here =============
type Count<Element extends unknown, Tuple extends unknown[], Counter extends 1[] = []> = 
  Tuple extends [infer Head, ...infer Rest]
  ? Head extends unknown[]
    ? Count<Element, [...Head, ...Rest], Counter>
    : Head extends Element
      ? Count<Element, Rest, [1, ...Counter]>
      : Count<Element, Rest, Counter>
  : Counter

type Flat<Tuple extends unknown[], Acc extends unknown[] = []> = 
  Tuple extends [infer Head, ...infer Rest]
  ? Head extends unknown[]
    ? Flat<[...Head, ...Rest], Acc>
    : Head extends Acc[number]
      ? Flat<Rest, Acc>
      : Flat<Rest, [...Acc, Head]>
  : Acc

type CountElementNumberToObject<
  T extends unknown[],
  _K extends unknown[] = Flat<T>
  > = { 
  [P in _K[number] as P extends PropertyKey ? P : never]: Count<P, T>['length']
}
  