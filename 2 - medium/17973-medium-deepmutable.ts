// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]


// ============= Your Code Here =============
// Моё первое кривое решение
// Всё так оттого, что в задаче не ясно какой тип мы должны принимать на входе: object включает в себя слишком много всего
// Record<PropertyKey, unknown> слишком мало
// type Primitive = PropertyKey | boolean | (() => unknown)

// type DeepMutable<T extends object> = {
//   -readonly [P in keyof T]: T[P] extends Primitive 
//                             ? T[P] 
//                             : T[P] extends object // на самом деле нужна только для подавления ошибки
//                               ? DeepMutable<T[P]>
//                               : never
// }

// Рефакторинг после видео
type DeepMutable<T extends object> = {
  -readonly [P in keyof T]: T[P] extends object 
                            ? (T[P] extends Function ? T[P] : DeepMutable<T[P]>) 
                            : T[P]
}



type t1 = DeepMutable<Test1>

type t2 = DeepMutable<Test2>


type t3 = DeepMutable<{ readonly m: readonly ['hey'] }>
type t4 = DeepMutable<{
  readonly i: true
  readonly j: 's'
}>
type t5 = DeepMutable<{
  readonly a: () => 1
}>
type t6 = DeepMutable<{
  readonly l: readonly ["hi", {
    readonly m: readonly ["hey"];
  }]}
  >



type t100 = Omit<DeepMutable<Test2 & {}> & {}, never>
