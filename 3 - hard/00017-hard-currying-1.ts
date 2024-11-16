// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const curried0 = Currying((a: string, b: number) => true)
const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried0, (a: string) => (b: number) => true
  >>,
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============
// Моё первое решение. Здесь всё хорошо, кроме того, 
// что я ограничиваю U как boolean | string | number - что-то до чего может быть сведено const
// Но тесты проходит
// declare function Currying<F extends (...args: any) => R, const R extends boolean | string | number>(fn: F): 
//   Parameters<F> extends [infer Head, ...infer Tail extends unknown[]]
//     ? Tail['length'] extends 0
//       ? (arg0: Head) => ReturnType<F>
//       : (arg0: Head) => ReturnType<typeof Currying<(...args: Tail) => ReturnType<F>, R>>
//     : () => ReturnType<F>

// Решение из видео
type Curry<A extends unknown[], R> = 
  A extends [infer Head, ...infer Tail]
  ? Tail['length'] extends 0
    ? (a: Head) => R
    : (a: Head) => Curry<Tail, R>
  : () => R

declare function Currying<Fn>(fn: Fn): 
  Fn extends (...args: infer A) => infer R
  ? Curry<A, R>
  : never