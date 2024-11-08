// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]


// ============= Your Code Here =============
// Моё как оказалось сильно замороченное решение
// type Fill<
//   T extends unknown[],
//   N extends unknown,
//   Start extends number = 0,
//   End extends number = T['length'],
//   Head extends unknown[] = SliceHead<T, Start>,
//   Tail extends unknown[] = SliceTail<T, End>
// > = 
//   Start extends End 
//   ? T
//   : T extends [...Head, ...infer Middle, ...Tail]
//     ? [...Head, ...Replace<Middle, N>, ...Tail]
//     : never

// type SliceHead<T extends unknown[], Start extends number, Counter extends 1[] = [], Acc extends unknown[] = []> = 
//   Counter['length'] extends Start
//   ? Acc
//   : T extends [infer Head, ...infer Tail]
//     ? SliceHead<Tail, Start, [...Counter, 1], [...Acc, Head]>
//     : Acc

// type Replace<T extends unknown[], N extends unknown> = {
//       [P in keyof T]: N
//     }  

// type SliceTail<T extends unknown[], End extends number, Counter extends 1[] = [1]> = 
//   T extends [infer Head, ...infer Tail]
//     ? [Counter]['length'] extends End
//       ? Tail
//       : SliceTail<Tail, End, [...Counter, 1]>
//     : []

type Fill<
    T extends unknown[],
    N extends unknown,
    Start extends number = 0,
    End extends number = T['length'],
    Acc extends unknown[] = []
    > = T extends [infer Head, ...infer Tail]
        ? [...Acc, 1][Start] extends undefined
          ? Fill<Tail, N, Start, End, [...Acc, Head]>
          : [...Acc, 1][End] extends undefined
            ? Fill<Tail, N, Start, End, [...Acc, N]>
            : Fill<Tail, N, Start, End, [...Acc, Head]>
        : Acc
      