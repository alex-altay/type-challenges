// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'
import { ExpectFalse, NotEqual } from '../test-utils'

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]


// ============= Your Code Here =============
type CreateRow<M extends number[][], I extends number, Counter extends 1[] = [], Acc extends number[] = []> = 
  Counter['length'] extends M['length']
  ? Acc
  : CreateRow<M, I, [1, ...Counter], [...Acc, M[Counter['length']][I]]>

type TransposeInternal<
  M extends number[][],
  Counter extends 1[] = [],
  Acc extends number[][] = [],
  > = 
  M[0]['length'] extends Counter['length']
  ? Acc
  : TransposeInternal<M, [1, ...Counter], [...Acc, CreateRow<M, Counter['length']>]>

type Transpose<M extends number[][]> = 
  M extends []
  ? []
  : TransposeInternal<M>