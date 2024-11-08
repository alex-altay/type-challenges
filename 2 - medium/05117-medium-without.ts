// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
// Моё решение
// type Without<T extends unknown[], U extends number | number[]> = 
//   T extends [infer Head, ...infer Rest]
//   ? IsExtends<Head, U> extends true
//     ? [...Without<Rest, U>]
//     : [Head, ...Without<Rest, U>]
//   : T

// type IsExtends<T extends unknown, U extends unknown[] | unknown> = 
//   U extends [infer Head, ...infer Rest]
//   ? T extends Head
//     ? true
//     : IsExtends<T, Rest>
//   : U extends T
//     ? true
//     : false

// Другой вариант после видео
type Without<T extends unknown[], U extends number | number[]> = 
  T extends [infer Head, ...infer Rest]
  ? Head extends Unionize<U>
    ? [...Without<Rest, U>]
    : [Head, ...Without<Rest, U>]
  : T

type Unionize<T> = 
  T extends [unknown, ...infer _]
  ? T[number]
  : T
