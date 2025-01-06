// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]


// ============= Your Code Here =============
type Helper<T, U = T> = 
  T extends unknown
  ? U extends T
    ? true
    : false
  : never
  
type IsUnion<T> = boolean extends Helper<T> ? true : false

type IsNegativeNumber<T extends number> = 
  IsUnion<T> extends true
  ? never
  : `${T}` extends `-${number}` 
    ? true 
    : number extends T
      ? never
      : false
    