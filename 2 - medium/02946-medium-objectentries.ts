// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]


// ============= Your Code Here =============
// Моё первое решение
type ObjectEntries<T> = {
  [P in keyof T]-?: [P, Required<T>[P] extends undefined ? undefined : Required<T>[P]]
}[keyof T]
