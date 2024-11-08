// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]


// ============= Your Code Here =============
// Моё первое решение 
// type Filter<T extends unknown[], U extends unknown, Acc extends unknown[] = []> =
//   T extends [infer Head, ...infer Rest]
//   ? Head extends U
//     ? Filter<Rest, U, [...Acc, Head]>
//     : Filter<Rest, U, Acc>
//   : Acc

  // Оказалось можно очень классно без аккумулятора
type Filter<T extends unknown[], U extends unknown> =
  T extends [infer Head, ...infer Rest]
  ? Head extends U
    ? [Head, ...Filter<Rest, U>]
    : Filter<Rest, U>
  : []