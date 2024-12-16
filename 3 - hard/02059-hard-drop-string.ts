// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]


// ============= Your Code Here =============
// Моё решение простое, хорошее и понятное, но...
// type DropOne<T, Letter extends string> = 
//   T extends `${infer Head}${Letter}${infer Tail}`
//   ? `${Head}${DropOne<Tail, Letter>}`
//   : T

// type DropString<S, R> = 
//   R extends `${infer Head}${infer Tail}`
//   ? DropString<DropOne<S, Head>, Tail>
//   : S

// То, которое я после того как решил увидел - великолепное!
type DropString<S, R> = 
  S extends `${infer Head}${infer Tail}`
  ? R extends `${string}${Head}${string}` // Просто блестяще
    ? DropString<Tail, R>
    : `${Head}${DropString<Tail, R>}`
  : S
  