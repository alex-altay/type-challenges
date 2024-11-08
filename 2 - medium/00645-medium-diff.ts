// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


// ============= Your Code Here =============
// Моё первое решение
type Diff<T extends Record<string, unknown>, U extends Record<string, unknown>> = 
  Omit<Omit<T, keyof U> & Omit<U, keyof T>, never>


// Второе решение без встроенных функций
// type Diff<T extends Record<string, unknown>, U extends Record<string, unknown>> = {
//   [P in keyof (T & U) as P extends keyof T 
//     ? P extends keyof U
//       ? never
//       : P
//     : P
//   ]: (T & U)[P]
// }
 