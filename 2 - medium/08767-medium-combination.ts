// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type ArrayToUnion<T extends string[]> = 
  T[number] extends string
    ? T[number]
    : never

type Combination<T extends string[], U extends string = ArrayToUnion<T>> = 
  U extends string 
    ? U | `${U} ${Combination<[Exclude<ArrayToUnion<T>, U>]>}`
    : never

type t1 = ArrayToUnion<['foo', 'bar', 'baz']>