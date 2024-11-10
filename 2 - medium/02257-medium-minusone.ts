// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
// Моё первое решение, которое работает с числами до 1101, упираясь в ограничение на глубину рекурсии
// type Times<T extends number, Acc extends unknown[] = []> =
//   Acc['length'] extends T
//   ? Acc
//   : Times<T, [...Acc, Acc['length']]>

// type Pop<T extends unknown[]> = T extends [infer F, ...infer Rest]
//   ? [...Rest]
//   : T

// type MinusOne<T extends number> = 
//   T extends 0
//   ? -1
//   : Pop<Times<T>> extends unknown[]
//     ? Pop<Times<T>>['length']
//     : never


// Вариант со строками

type Naturals = {
  '0': '9',
  '9': '8',
  '8': '7',
  '7': '6',
  '6': '5',
  '5': '4',
  '4': '3',
  '3': '2',
  '2': '1',
  '1': '0'
}

type MinusOne<
  T extends number, 
  Reversed extends string = ReverseString<`${T}`>,
  MinusString extends string = ReverseString<MinusOneString<Reversed>>
  > = MinusString extends `${infer N extends number}`
      ? N 
      : MinusString extends `-${infer N extends number}`
        ? N
        : never

type MinusOneString<T extends string> = 
  T extends `0${infer Rest}`
  ? Rest extends ""
    ? '1-' 
    : Rest extends '1'
      ? '9'
      : `9${MinusOneString<Rest>}`
  : T extends `${infer Head extends keyof Naturals}${infer Rest}`
    ? `${Naturals[Head]}${Rest}`
    : ''

type ReverseString<T extends string> = 
  T extends `${infer Head}${infer Tail}`
  ? `${ReverseString<Tail>}${Head}`
  : T
