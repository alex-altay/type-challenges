// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]


// ============= Your Code Here =============
type GetOptional<T, R extends T = Required<T>> = {
  [P in keyof T as T[P] extends R[P] ? never : P]: T[P]
}