// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]


// ============= Your Code Here =============
// Рабочее решение
// type RemoveIndexSignature<T, P = PropertyKey> = {
//   [K in keyof T as 
//     P extends K  
//     ? never
//     : K extends P
//       ? K
//       : never
//   ]: T[K]
// }

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as Literal<K>]: T[K]
}

type Literal<T> = 
  string extends T 
  ? never
  : number extends T
    ? never
    : symbol extends T
      ? never
      : T


type t1 = RemoveIndexSignature<Foo>
type t2 = RemoveIndexSignature<Bar>
type t3 = RemoveIndexSignature<FooBar>
type t4 = RemoveIndexSignature<Baz>



type p = Literal<string | number>
type p1 = Literal<'s' | number>