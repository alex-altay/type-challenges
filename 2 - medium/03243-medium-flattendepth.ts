// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
type FlattenDepth<T extends unknown[], Depth extends number = 1, Already extends unknown[] = []> = 
  Depth extends [...Already]['length'] 
  ? T
  : T extends [infer F extends unknown[], ...infer Rest]
    ? [...FlattenDepth<F, Depth, [...Already, 1]>, ...FlattenDepth<Rest, Depth, Already>]
    : T extends [infer F, ...infer Rest]
      ? [F, ...FlattenDepth<Rest, Depth, Already>]
      : T


type t1 = FlattenDepth<[]>
type t2 = FlattenDepth<[1, 2, 3, 4]>
type t3 = FlattenDepth<[1, [2]]>
type t4 = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>
type t5 = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>
type t6 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>
type t7 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>