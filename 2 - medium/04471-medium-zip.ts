// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]


// ============= Your Code Here =============
// Моё решение
// type Zip<T extends unknown[], U extends unknown[], Acc extends unknown[] = []> = 
//   T extends [infer K, ...infer KRest]
//   ? U extends [infer V, ...infer VRest]
//     ? [...Acc, [K, V], ...Zip<KRest, VRest>]
//     : Acc
//   : [...Acc]

// Оказалось можно проще
// type Zip<First extends unknown[], Second extends unknown[]> =
//   First extends [infer FirstHead, ...infer FirstRest ]
//   ? Second extends [infer SecondHead, ...infer SecondRest ]
//     ? [[FirstHead, SecondHead], ...Zip<FirstRest, SecondRest>]
//     : []
//   : []

// Добавим сахара
  type Zip<First extends unknown[], Second extends unknown[]> =
  [First, Second] extends [
      [infer FirstHead, ...infer FirstRest],
      [infer SecondHead, ...infer SecondRest]]
  ? [[FirstHead, SecondHead], ...Zip<FirstRest, SecondRest>]
  : []
