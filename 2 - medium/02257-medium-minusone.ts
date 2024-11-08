// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
type Times<T extends number, Acc extends unknown[] = []> =
  Acc['length'] extends T
  ? Acc
  : Times<T, [...Acc, Acc['length']]>

type Pop<T extends unknown[]> = T extends [infer F, ...infer Rest]
  ? [...Rest]
  : T


type MinusOne<T extends number> = 
  T extends 0
  ? -1
  : Pop<Times<T>> extends unknown[]
    ? Pop<Times<T>>['length']
    : never


type p1 = Pop<[1, 2, 3]>  
type t2 = MinusOne<1101>
type t3 = Times<1101>


type ToNumber<T> = T extends `${infer R extends number}` ? R : never
type one = ToNumber<'3'>