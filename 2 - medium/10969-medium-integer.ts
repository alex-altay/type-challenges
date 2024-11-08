// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'
import { ExpectFalse, NotEqual } from '../test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]


// ============= Your Code Here =============
// Моё первое решение
type Integer<T extends number> = 
  `${T}` extends `${infer _ extends number}.${infer _}` 
  ? never
  : number extends T
    ? never
    : T

type t1 = Integer<1>
type t2 = Integer<1.1>
type t3 = Integer<1.0>
type t4 = Integer<1.000000000>
type t5 = Integer<0.5>
type t6 = Integer<28.00>
type t7 = Integer<28.101>
type t8 = Integer<typeof x>
type t9 = Integer<typeof y>