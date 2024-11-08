// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============

// Моё первое решение с алфавитом
// type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
// type KebabCase<T extends string, isFirstLetter extends boolean = true> =
//   T extends `${infer H}${infer R}` 
//   ? H extends Alphabet
//     ? isFirstLetter extends true
//       ? `${Lowercase<H>}${KebabCase<R, false>}` 
//       : `-${Lowercase<H>}${KebabCase<R, false>}`
//     : `${H}${KebabCase<R, false>}` 
//   : T


// Решение без алфавита
type KebabCase<T extends string, isFirstLetter extends boolean = true> =
  T extends `${infer H}${infer R}` 
  ? H extends Lowercase<H>
    ? `${H}${KebabCase<R, false>}` 
    : isFirstLetter extends true
      ? `${Lowercase<H>}${KebabCase<R, false>}` 
      : `-${Lowercase<H>}${KebabCase<R, false>}`
  : T