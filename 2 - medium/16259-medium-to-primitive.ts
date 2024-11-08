// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
// Моё первое решение
type ToPrimitive<T extends unknown> = {
  [P in keyof T]: T[P] extends Primitive ? ElementToPrimitive<T[P]> : ToPrimitive<T[P]>
}

type Primitive = string | number | boolean | Function

type ElementToPrimitive<T extends unknown> = 
  T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Function
        ? Function
        : T
