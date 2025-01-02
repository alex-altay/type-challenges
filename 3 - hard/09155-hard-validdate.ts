// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]

// ============= Your Code Here =============
type D = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type M28 = `0${D}` | `1${0 | D}` | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`
type M30 = `0${D}` | `${1 | 2}${0 | D}` | '30'
type M31 = `0${D}` | `${1 | 2}${0 | D}` | '30' | '31'

type Months = 
  & { [P in '01' | '03' | '05' | '07' | '08' | '10' | '12']: M31 }
  & { [P in '04' | '06' | '09' | '11']: M30 }
  & { '02': M28 }

type ValidDate<T extends string> = 
  T extends `${infer M1}${infer M2}${infer Days}`
  ? `${M1}${M2}` extends keyof Months
    ? Days extends Months[`${M1}${M2}`]
      ? true
      : false
    : false
  : false
