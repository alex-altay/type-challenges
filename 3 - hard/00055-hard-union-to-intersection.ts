// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

// ============= Your Code Here =============
type UnionToIntersection<T> =
  UnionToFunctionsUnion<T> extends (a: infer U) => unknown
  ? U
  : never

type UnionToFunctionsUnion<T> = 
  T extends unknown
  ? (a: T) => unknown
  : never

/*
Объяснение

type UnionToFunctionsUnion<T> = Преобразовываем юнион в юнион функций
  T extends unknown             Запускаем распределение юниона, чтобы результат был не (a: 42 | 'foo' | true) => any
  ? (a: T) => unknown           А (a: 42) => unknown | (a: 'foo) => unknown | (a: true) => unknown
  : never

type UnionToIntersection<T> = 
  UnionToFunctionsUnion<T> extends (a: infer U) => unknown  Здесь фокус, который если не знать, то не решишь
  ? U                                                       Если бы T было обычным юнионом, то U в выражении a: infer U  
  : never                                                   наследовалось бы как юнион, но не для функций

То есть 

(42 | 'foo' | true) extends infer U
? U // Вернёт 42 | 'foo' | true
: never



Но
((a: 42) => unknown | (a: 'foo) => unknown | (a: true) => unknown) extends (a: infer U) => unknown
? U // Вернёт пересечение 42 & 'foo' & true
: never

Почему?
Это связано с понятием контравариантность (которое мне сложно):

Тип A считается контравариантным по отношению к типу B, если можно использовать B там, 
где ожидается A (обратное подстановке).

Пример: Если есть функция с аргументом определённого типа, то этот аргумент находится в контравариантной позиции. 
Это означает, что для функции f: (arg: T) => void, тип T должен быть менее строгим 
(например, суперкласс или супермножество), чтобы функция могла принимать более широкий набор значений.

Когда TypeScript пытается вывести тип для параметров, которые находятся в контравариантной позиции, 
он объединяет возможные типы через пересечение (&), а не объединение (|).
*/