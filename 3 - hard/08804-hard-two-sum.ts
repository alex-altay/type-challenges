// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]

// ============= Your Code Here =============
// simple brute force with complexity n**2
type NumberToArray<T extends number, Acc extends 1[] = []> = 
  T extends Acc['length']
  ? Acc
  : NumberToArray<T, [1, ...Acc]>
    
type HasPair<Pretender extends number, Array extends number[], Result extends number> = 
  Array extends [infer Head extends number, ...infer Rest extends number[]]
  ? NumberToArray<Result> extends [...NumberToArray<Pretender>, ...NumberToArray<Head>]
    ? true
    : HasPair<Pretender, Rest, Result>
  : false

type TwoSum<
    T extends number[], 
    Result extends number,
  > = T extends [infer Head extends number, ...infer Rest extends number[]]
      ? HasPair<Head, Rest, Result> extends true
        ? true
        : TwoSum<Rest, Result>
      : false
