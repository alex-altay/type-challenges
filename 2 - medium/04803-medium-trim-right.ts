// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]


// ============= Your Code Here =============
type Empty = ' ' | '\n' | '\t'

// Мудрёный способ, когда я забыл, что infer может быть жадным
// type Reverse<S extends string, Acc extends string = ''> = 
//   S extends `${infer H extends string}${infer T extends string}`
//   ? Reverse<T, `${H}${Acc}`>
//   : Acc

// type TrimLeft<S extends string> = S extends `${infer Head extends Empty}${infer Tail}` ? TrimLeft<Tail> : S

// type TrimRight<
//   S extends string, 
//   Reversed extends string = Reverse<S>> = Reverse<TrimLeft<Reversed>>

type TrimRight<T extends string> = 
  T extends `${infer Head}${Empty}`
    ? TrimRight<Head>
    : T