// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
]


// ============= Your Code Here =============
// Моё первое решение
// type Join<T extends string[], U extends string | number> = 
//   T extends [infer Head extends string, ...infer Rest extends string[]]
//     ? Rest['length'] extends 0
//       ? `${Head}`
//       : `${Head}${U}${Join<Rest, U>}`
//   : ''

  // В видео подсмотрел умную вещь

type Join<T extends string[], U extends string | number> = 
  T extends [infer Head extends string, ...infer Rest extends string[]]
    ? `${Head}${Rest extends [] ? '' : U}${Join<Rest, U>}`
    : ''

type t0 = Join<['a', 'p', 'p', 'l', 'e'], '-'>