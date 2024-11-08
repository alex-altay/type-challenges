// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${JoinE<E>}${JoinM<M>}`

type JoinE<T extends string[]> = T['length'] extends 0 ? '' : `__${T[number]}`
type JoinM<T extends string[]> = T['length'] extends 0 ? '' : `--${T[number]}`
