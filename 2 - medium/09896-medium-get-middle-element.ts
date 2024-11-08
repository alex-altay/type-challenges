// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>


// ============= Your Code Here =============
// Моё первое решение
// type GetMiddleElement<T extends unknown[], Counter extends 1[] = []> =
//   T extends []
//   ? T
//   : T['length'] extends [1, ...Counter, ...Counter]['length']
//     ? [T[Counter['length']]]
//     : T['length'] extends [1, 1, ...Counter, ...Counter]['length']
//       ? [T[Counter['length']], T[[1, ...Counter]['length']]]
//       : GetMiddleElement<T, [1, ...Counter]>

// Красивое решение из видео
type GetMiddleElement<T extends unknown[]> = 
  T['length'] extends 0 | 1 | 2
  ? T
  : T extends [unknown, ...infer M, unknown]
    ? GetMiddleElement<M>
    : never
