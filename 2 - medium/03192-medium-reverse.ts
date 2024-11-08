// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]


// ============= Your Code Here =============

// Моё решение
// type Reverse<A extends unknown[], T extends unknown[] = []> = A extends [...infer Head, infer Tail]
//   ? Reverse<Head, [...T, Tail]> 
//   : T

// Как можно было сделать элегантнее из видео
type Reverse<A extends unknown[]> = A extends [...infer Head, infer Tail] 
  ? [Tail, ...Reverse<Head>]
  : []
