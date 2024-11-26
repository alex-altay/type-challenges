// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]


// ============= Your Code Here =============
// Моё первое решение
// type FilterOut<T extends unknown[], F, Acc extends unknown[] = []> = 
//   T extends [infer Head, ...infer Tail]
//   ? ShouldBeFiltered<Head, F> extends true
//     ? FilterOut<Tail, F, Acc>
//     : FilterOut<Tail, F, [...Acc, Head]>
//   : Acc

// type ShouldBeFiltered<T, F> = 
//   [T, F] extends [F, T] 
//   ? true 
//   : T extends F
//     ? true
//     : false

// Как красиво решают люди. Аккумулятор очень часто может быть совершенно отброшен
type FilterOut<T extends unknown[], F, Acc extends unknown[] = []> = 
  T extends [infer Head, ...infer Tail]
  ? [Head] extends [F]
    ? FilterOut<Tail, F>
    : [Head, ...FilterOut<Tail, F>]
  : []
