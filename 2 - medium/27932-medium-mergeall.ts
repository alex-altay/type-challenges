// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1; c: 2 }>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2; b: 2; c: 3 }>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]


// ============= Your Code Here =============
type MergeAll<T extends unknown[]> = 
  T['length'] extends 0 ? {} :
  T['length'] extends 1 ? T[0] :
  T extends [infer A, infer B, ...infer Rest] 
    ? MergeAll<[MergeAB<A, B>, ...Rest]>
    : never

type MergeAB<A, B> = Omit<{
  [P in (keyof A | keyof B) as P extends PropertyKey ? P : never]: A[P & keyof A] | B[P & keyof B]
}, never>
