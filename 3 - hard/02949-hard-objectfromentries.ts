// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============
/*
Сперва наворотил такую логику, используя решениe UnionToIntersection
type ObjectFromEntries<T extends [PropertyKey, unknown]> = Merge<ToIntersection<T>>
type Merge<T> = Omit<T, never>
type ToIntersection<T extends [PropertyKey, unknown]> = 
  (T extends T
  ? (a: { [P in T as P[0]]: P[1] }) => void
  : never) extends (a: infer R) => void
    ? R
    : never
*/

// Но оказалось можно просто вот так:
type ObjectFromEntries<T extends [PropertyKey, unknown]> = {
  [P in T as P[0]]: P[1]
}