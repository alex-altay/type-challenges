// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: undefined }, 'b' | 'a'>, true>>,
]


// ============= Your Code Here =============
type Helper<T, K extends keyof T> = 
  K extends unknown       // запускаем дистрибуцию типов
  ? Omit<T, K> extends T  // если исключить необязательное поле, то объект будет соответстовать T
    ? false               // а если исключить обязательное, то нет
    : true
  : never

type IsRequiredKey<T, K extends keyof T, H = Helper<T, K>> = 
  boolean extends H       // если в K есть и обязательное и необязательное поле, то true | false в Helper дадут boolean
  ? false                 // по условиям задачи это false
  : H
