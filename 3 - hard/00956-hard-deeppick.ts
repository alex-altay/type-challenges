// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============
// Моё первое решение
// DeepPick<Obj, 'a' | 'obj.e'> ===  { a: number } & { obj: { e: string } }
type DeepPick<T, U extends string> = UnionToIntersection<UnionPick<T, U>>

// UnionToIntersection<{a: 'number'} | { obj: { e: string } }> === { a: number } & { obj: { e: string } }
type UnionToIntersection<T> = UnionToFunction<T> extends (a: infer U) => unknown ? U : never

// UnionToFunction<{a: 'number'} | {obj: {e: string }}> === ((a: {a: 'number'}) => unknown) | ((a: { obj: { e: string } }) => unknown)
type UnionToFunction<T> = T extends unknown ? (a: T) => unknown : never

// UnionPick<Obj, 'a' | 'obj.e'> === {a: number} | {obj: {e: string}}
type UnionPick<T, U extends string> = 
  U extends keyof T
  ? Pick<T, U>
  : U extends `${infer Head extends keyof T & string}.${infer Tail extends string}`
    ? { [P in Head]: UnionPick<T[Head], Tail> }
    : never
