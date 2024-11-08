// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
// Первое решение, которое решало все кейсы, но ругалось на глубину рекурсии
// type MinusOne<T extends 1[]> = T extends [infer Head, ...infer Rest] ? Rest : []
// type MinusTwo<T extends 1[]> = T extends [infer First, infer Second, ...infer Rest] ? Rest : []
// type FArray<T extends 1[]> = 
//   T extends [1]
//   ? [1]
//   : T extends [1, 1]
//     ? [1]
//     : [...FArray<MinusOne<T>>, ...FArray<MinusTwo<T>>]
// type Fibonacci<T, K extends 1[] = NumberToArray<T>> = FArray<K>['length']


// Второе через цикл
type NumberToArray<T, Acc extends 1[] = []> = 
  T extends Acc['length'] 
  ? Acc 
  : NumberToArray<T, [...Acc, 1]>

type Cycle<
  N extends 1[], 
  I extends 1[] = [1, 1], 
  A extends 1[] = [], 
  B extends 1[] = [1], 
  > = 
  N extends []
  ? A
  : I extends [1, ...N]
    ? B
    : Cycle<N, [1, ...I], [...B], [...B, ...A]>

type Fibonacci<T extends number, N extends 1[] = NumberToArray<T>> = Cycle<N>['length']
