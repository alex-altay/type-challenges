// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150, 900]>, 900>>,
]


// ============= Your Code Here =============
type NumberToArray<T extends number, Acc extends 1[] = []> = 
  T extends Acc['length']
  ? Acc 
  : NumberToArray<T, [1, ...Acc]>

type MaxOfTwo<Pretender extends number, Current extends number> =
  [...NumberToArray<Pretender>] extends [...NumberToArray<Current>, ...1[]]
  ? Pretender
  : Current

type Maximum<T extends number[]> = 
  T extends [] // branches are needed only for edge case when T equal [] should return never
  ? never
  : _Maximum<T>
  
type _Maximum<T extends number[], Current extends number = 0> =    
  T extends [infer Head extends number, ...infer Rest extends number[]]
  ? _Maximum<Rest, MaxOfTwo<Current, Head>>
  : Current
