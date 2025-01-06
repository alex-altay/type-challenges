// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<OptionalUndefined<{ value: string | undefined }, 'value'>, { value?: string | undefined }>>,
  Expect<Equal<OptionalUndefined<{ value: string; desc: string }, 'value'>, { value: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string }, 'value'>, { value?: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string | undefined }, 'value'>, { value?: string | undefined; desc: string | undefined }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string }, 'value' | 'desc'>, { value?: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string | undefined }>, { value?: string; desc?: string }>>,
  Expect<Equal<OptionalUndefined<{ value?: string }, 'value'>, { value?: string }>>,
  Expect<Equal<OptionalUndefined<{ value?: string }>, { value?: string }>>,
]


// ============= Your Code Here =============
type Merge<T> = { 
  [P in keyof T]: T[P] 
}
type Optional<T, Props extends keyof T, Picked = Pick<T, Props>> = {
  [P in keyof Picked as undefined extends Picked[P] ? P : never] +?: Picked[P]
}
type OptionalUndefined<T, Props extends keyof T = keyof T, O = Optional<T, Props>> = Merge<O & Omit<T, keyof O>>
