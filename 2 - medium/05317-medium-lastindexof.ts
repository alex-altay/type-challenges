// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]


// ============= Your Code Here =============
// Первый вариант
// type LastIndexOf<T extends unknown[], U, Acc extends 1[] = [], Indexes extends number[] = []> = 
//   T extends [infer Head, ...infer Rest]
//     ? Equal<Head, U> extends true
//       ? LastIndexOf<Rest, U, [...Acc, 1], [Acc['length'] ,...Indexes]>
//       : LastIndexOf<Rest, U, [...Acc, 1], [...Indexes]>
//     : Indexes[0] extends number
//       ? Indexes[0]
//       : -1

// После видео - отличный вариант
type LastIndexOf<T extends unknown[], U> = 
  T extends [...infer Head, infer Tail]
  ? Equal<Tail, U> extends true
    ? Head['length']
    : LastIndexOf<Head, U>
  : -1