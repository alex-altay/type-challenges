// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============
type Subsequence<T extends number[]> = 
  T extends [infer Head, ...infer Rest extends number[]]
  ? [Head] | Subsequence<Rest> | [Head, ...Subsequence<Rest>]
  : []

type t1 = Subsequence<[1, 2, 3]>