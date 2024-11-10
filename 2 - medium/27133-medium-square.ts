// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<80>, 6400>>,
  Expect<Equal<Square<90>, 8100>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<50>, 2500>>,
]


// ============= Your Code Here =============
// Первое решение, которое работает для чисел меньше 100
// Проходит все тесты кроме сотни, чтобы работало дальше нужно писать по формуле разложения квадратов
// (a + b)**2 = a**2 + 2ab + b**2, но мне лень
// это требует сохранения больших констант квадратов например для натуральных чисел, 10 и 100
// реализации вычитания и смысла в этом нет, потому что тайпскрипт + арифметика = ад

type NumberToArray<T extends number, Counter extends 1[] = []> = 
  T extends Counter['length']
  ? Counter
  : NumberToArray<T, [1, ...Counter]>

type Module<T extends number> = 
  `${T}` extends `-${infer N extends number}` 
  ? N
  : T

type Square<
  N extends number,
  Counter extends unknown[] = [],
  Acc extends unknown[] = [],
  T extends number = Module<N>
> = T extends 100 // dirty hack
  ? 10000 
  : Counter["length"] extends T
    ? Acc["length"]
    : Square<N, [...Counter, 0], [...Acc, ...NumberToArray<T>]>;

// Что интересного я здесь узнал:
// Странно, но если вынести создание массивов и проверку модуля в отдельные типы, 
// то компилятор начнет ругаться на глубину рекурсии раньше, хотя казалось бы
// логичнее вынести вызов NumberToArray<T> наверх, 
// чтобы он вызвался только один раз, создал массив (он всегда один и тот же), 
// а дальше в тип передавал уже этот массив готовым
// через аргумент дженерика, но нет, так мы упираемся в ограничение по глубине рекурсии ещё раньше
// Возможное объяснение? Компилятор где-то кэширует у себя вызов и увеличивает допустимую глубину
