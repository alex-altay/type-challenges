// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]


// ============= Your Code Here =============
// Моё первое решение
// type IsTuple<T> = 
//   [T] extends [never] 
//   ? false
//   : T extends [] 
//     ? true
//     : T extends readonly[infer _]
//       ? true
//       : false

// Вторая версия
type IsTuple<T> = 
  [T] extends [never]
  ? false
  : T extends (readonly[unknown] | [])
    ? true
    : false


type t0 = IsTuple<[]>
type t1 = IsTuple<[number]>
type t2 = IsTuple<readonly [1]>
type t3 = IsTuple<never>