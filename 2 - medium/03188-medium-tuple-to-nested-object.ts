// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]


// ============= Your Code Here =============
// Моё первое рабочее решение
// type TupleToNestedObject<T extends string[], U> = 
//   T extends []
//   ? U
//   : T extends [infer F extends string] 
//     ? Record<F, U>
//     : T extends [infer F extends string, ...infer Rest extends string[]]
//       ? Record<F, TupleToNestedObject<Rest, U>>
//       : never

// Оптимизация
// type TupleToNestedObject<T extends string[], U> = 
//   T extends [infer F extends string] 
//   ? Record<F, U>
//   : T extends [infer F extends string, ...infer Rest extends string[]]
//     ? Record<F, TupleToNestedObject<Rest, U>>
//     : U

// Ещё одна оптимизация, но теперь уже после видео

type TupleToNestedObject<T extends string[], U> = 
  T extends [infer F extends string, ...infer Rest extends string[]]
    ? Record<F, TupleToNestedObject<Rest, U>>
    : U