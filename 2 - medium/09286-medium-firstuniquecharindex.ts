// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
type FirstUniqueCharIndex<T extends string, K extends string = '', Acc extends 1[] = []> = 
  T extends `${infer Head}${infer Rest}`
  ? `${K}${Rest}` extends `${string}${Head}${string}`
    ? FirstUniqueCharIndex<`${Rest}`, `${K}${Head}`, [...Acc, 1]>
    : Acc['length']
  : -1

type a1 = FirstUniqueCharIndex<'aabb'>
