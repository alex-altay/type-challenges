// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]


// ============= Your Code Here =============

// Моё первое решение
// type DropChar<T extends string, C extends string> = 
//   T extends `${infer H}${infer Rest}`
//   ? H extends C
//     ? `${DropChar<Rest, C>}`
//     : `${H}${DropChar<Rest, C>}`
//   : T

// После видео
type DropChar<T extends string, C extends string> = 
  T extends `${infer Left}${C}${infer Right}`
    ? `${Left}${DropChar<Right, C>}`
    : T
