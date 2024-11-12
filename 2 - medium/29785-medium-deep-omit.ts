// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string; age: {} } }>>,
]


// ============= Your Code Here =============
type DeepOmit<T, U extends string> = 
  U extends `${infer Head}.${infer Rest}`
  ? { [P in keyof T]: P extends Head ? DeepOmit<T[P], Rest> : T[P] } 
  : { [P in keyof T as P extends U ? never : P]: T[P] }
