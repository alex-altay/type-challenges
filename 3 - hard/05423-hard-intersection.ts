// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]


// ============= Your Code Here =============
/*
Я бы сказал, что моё решение не в духе тайпскрипта, а скорее больше похоже на обычный js. 
Я довольно много с ним помучался, решил задачку только со второго подхода 
и оба подхода в сумме заняли явно больше часа

Как работает моё решение: мы итерируемся по элементам кортежа и смотрим с помощью вспомогательных типов:
- входит ли один элемент в один кортеж
- входит ли этот элемент во все кортежи и юнионы
- какие из элементов первого кортежа входят во все другие элементы
- возвращаем эти элементы
- браво, мы великолепны

Единственный фокус, который я здесь использую, заключается в проверке (Example<A> | Example<B>) extends true
Логика здесь такая: при дистрибуции у тебя может возникнуть ситуация, когда например 1 будет входить в [1, 2] и [1, 3],
но не в [2, 3], тогда юниони из true | true | false даст boolean, а это не то, что нужно
Эта проверка его исключает: true extends true, но boolean не extends true
*/


// is 1 in [1, 2, 3] - true
type OneInOne<T, U> = 
  T extends U
  ? true
  : U extends unknown[]
    ? T extends U[number]
      ? true
      : false
    : false

// is 1 in [[1, 2], [1, 3], 1 | 3] - true
type OneInEvery<T, U extends unknown[]> = 
  U extends [infer Head, ...infer Tail]
  ? (OneInOne<T, Head> | OneInEvery<T, Tail>) extends true
    ? true
    : false
  : never

// which of [1, 2, 3] is in [[1, 2], [1, 3], 1 | 3] - 1
type WhichInEvery<T extends unknown[], U extends unknown[]> = 
  T extends [infer Head, ...infer Tail]
  ? OneInEvery<Head, U> extends true
    ? Head | WhichInEvery<Tail, U>
    : WhichInEvery<Tail, U>
  : never 

type Intersection<T extends unknown[]> = 
  T extends [infer Head extends unknown[], ...infer Tail]
  ? WhichInEvery<Head, Tail>
  : never

/*
Вот элегантное, но чужое решение в духе TS

type Intersection<T extends unknown[]> = 
  T extends [infer Head, ...infer Tail]
  ? (Head extends unknown[] ? Head[number] : Head) & Intersection<Tail>
  : unknown

Здесь используется unknown, потому что он даёт что-то похожее на умножение на 1, сохраняет другой результат 
type N = 1 & never // never
type U = 1 & unknown // 1

В третьей строчке просто дистрибуция:
type A = 1 
type B = [1, 2, 3]
type C = A & B[number] // 1

Как работает рекурсия в этом примере
Intersection<[1, [1, 3, 4], [1, 3, 6]]> / 1
по шагам:
1 & Intersection<[[1, 3, 4], [1, 3, 6]]>
1 & ([1, 3, 4][number] & Intersection<[[1, 3, 6]]>)
1 & (1 & [1, 3, 6][number] & unknown)
1 & (3 & [1, 3, 6][number] & unknown)
1 & (4 & [1, 3, 6][number] & unknown)
1 & 1 
1
*/

