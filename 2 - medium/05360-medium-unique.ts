// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<['a', 1, 'a', 2, 'b', 2, 'a']>, ['a', 1, 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]


// ============= Your Code Here =============
// Моё первое решение
// type Unique<T extends unknown[], Acc extends unknown[] = []> = 
//   T extends [infer Head, ...infer Rest]
//   ? Includes<Head, Acc> extends true
//     ? Unique<Rest, Acc>
//     : Unique<Rest, [...Acc, Head]>
//   : Acc

type Includes<T, Acc> = 
  Acc extends [infer Head, ...infer Rest]
  ? Equal<T, Head> extends true
    ? true
    : Includes<T, Rest>
  : false

// Я вижу пути
// unionize все значения массива, а потом из юниона создай новый массив
// с накопителем, проверяем по очередно все элементы в массиве есть ли они там уже или нет и кладем туда
// двойным вложенным обходом делая Equal<T, U> для каждой комбинации элементов

// А вот так решили в видео, элегантно без аккумулятора
// Когда мы обходим массив с конца, то мы добавляем только первый элемент

type Unique<T extends unknown[]> = 
  T extends [...infer Head, infer Tail] 
  ? Includes<Tail, Head> extends true
    ? Unique<Head> // не добавляем повторы
    : [...Unique<Head>, Tail] // добавляем только уникальные, сохраняем порядок
  : []

  type e1 = Unique<[1, 'a', 2, 'b', 2, 'a']>
