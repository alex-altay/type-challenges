// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
type Merge<T, K> = {
  [Property in keyof (T & K)]: 
    Property extends keyof K
    ? K[Property]
    : Property extends keyof T 
      ? T[Property]
      : never
}
