// ============= Test Cases =============
import type { ExpectExtends, ExpectFalse, ExpectTrue } from '../test-utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c'] >>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']>, ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']>>,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>,
]


// ============= Your Code Here =============
type Path<T> = {
  [P in keyof T]: T[P] extends object ? [P] | [P, ...Path<T[P]>] : [P]
}[keyof T]
