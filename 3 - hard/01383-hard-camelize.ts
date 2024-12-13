// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type CamelizeString<T> = 
  T extends `${infer Head}_${string}`
  ? T extends `${Head}_${infer Tail extends string}`
    ? `${Head}${Capitalize<CamelizeString<Tail>>}`
    : Head
  : T

type CamelizeTuple<Tuple extends unknown[]> = {
  [K in keyof Tuple]: Tuple[K] extends string ? Tuple[K] : Camelize<Tuple[K]>
}

type Camelize<T> = {
    [P in keyof T as P extends string ? CamelizeString<P> : P]: 
    T[P] extends string 
    ? T[P]
    : T[P] extends unknown[]
      ? CamelizeTuple<T[P]>
      : Camelize<T[P]>
  }
