// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
type GetRequired<T, R extends T = Required<T>> = {
  [P in keyof T as T[P] extends R[P] ? P : never]: T[P]
}

// Собственно идея простая, решил за пару минут:
// 1. Создаем копию объекта, где все ключи обязательные
// 2. Создаем mapped type, в котором идём ключ за ключом и сравниваем ключ-значение изначального объекта с копией
// 3. Обязательный будет экстендить обязательный, а необязательный нет
