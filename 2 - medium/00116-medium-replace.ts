// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
  Expect<Equal<Replace<'types are fun!', 'fun', 'awesome'>, 'types are awesome!'>>,
]


// ============= Your Code Here =============
type Replace<
  S extends string, 
  From extends string, 
  To extends string
  > = From extends '' 
    ? S
    : S extends `${infer Head}${From}${infer Teil}` 
      ? `${Head}${To}${Teil}`
      : S
