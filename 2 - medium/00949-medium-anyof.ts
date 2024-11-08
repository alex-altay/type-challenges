// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]


// ============= Your Code Here =============

// Моё первое говнорешение
// type Falsy = 0 | false | null | undefined | '' | []
// type isObjectFull<T> = T extends Falsy
//   ? false
//   : keyof T extends never 
//     ? false
//     : true

// type AnyOf<T extends readonly unknown[]> = 
//   T extends [infer First, ...infer Rest]
//     ? isObjectFull<First> extends true
//       ? true
//       : AnyOf<Rest>
//     : false


// После видео
type Falsy = 0 | false | null | undefined | '' | [] | Record<string, never>

type AnyOf<T extends readonly unknown[]> = 
  T extends [infer First, ...infer Rest]
    ? First extends Falsy
      ? AnyOf<Rest>
      : true
    : false
