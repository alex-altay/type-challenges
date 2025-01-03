// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]

// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = 
  T extends unknown[] 
  ? { [P in keyof T]: CapitalizeNestObjectKeys<T[P]>} 
  : T extends {} 
    ? { [P in keyof T as T extends {} ? Capitalize<P & string> : P]: CapitalizeNestObjectKeys<T[P]> }
    : T
