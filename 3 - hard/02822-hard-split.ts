// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'The sine in cosine', 'in'>, ['The s', 'e ', ' cos', 'e']>>,
  Expect<Equal<Split<'Never say never, forever and ever.', 'ver'>, ['Ne', ' say ne', ', fore', ' and e', '.']>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<''>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]


// ============= Your Code Here =============
type Split<S extends string, SEP extends string | null = null, Acc extends string[] = []> = 
  SEP extends null
  ? [S]
  : S extends `${infer Head}${SEP}${infer Tail}`
    ? Split<Tail, SEP, [...Acc, Head]>
    : [S, SEP] extends ['', '']
      ? Acc
      : string extends S
        ? string[]
        : [...Acc, S]
