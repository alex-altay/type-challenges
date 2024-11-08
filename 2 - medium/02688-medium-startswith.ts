// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]

// ============= Your Code Here =============

// === Insane One ===
type StartsWith<T extends string, U extends string> = 
  ZeroLength<U> extends true
  ? true
  : LengthOfOne<U> extends true 
    ? FirstSymbol<U> extends FirstSymbol<T>
      ? true
      : false
    : StartsWith<Teil<T>, Teil<U>>  

type ZeroLength<T extends string> = T extends '' ? true : false
type LengthOfOne<T extends string> = T extends `${infer _}${infer B}` ? ZeroLength<B> : false
type FirstSymbol<T extends string> = T extends `${infer U}${infer _rest}` ? U : never
type Teil<A extends string> = A extends `${infer _}${infer Teil}` ? Teil : never

// === Correct one ===
// type StartsWith<A extends string, B extends string> = A extends `${B}${string}` ? true : false