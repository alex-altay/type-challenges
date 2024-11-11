// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
]


// ============= Your Code Here =============
type Triangular<
  T extends number, 
  Counter extends 1[] = [], 
  Acc extends 1[] = [],
  > =
  Counter['length'] extends T
  ? Acc['length']
  : Triangular<T, [1, ...Counter], [1, ...Acc, ...Counter]>
