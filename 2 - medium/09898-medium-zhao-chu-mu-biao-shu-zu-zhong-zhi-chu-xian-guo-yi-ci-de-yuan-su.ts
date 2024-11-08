// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'
import { ExpectFalse, NotEqual } from '../test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============
type FindEles<
  T extends unknown[], 
  FirstPart extends unknown[] = [], 
  Acc extends unknown[] = []
  > = 
    T extends [infer Head, ...infer Rest]
    ? Head extends [...FirstPart, ...Rest][number]
      ? FindEles<Rest, [...FirstPart, Head], Acc>
      : FindEles<Rest, [...FirstPart, Head], [...Acc, Head]>
    : Acc
