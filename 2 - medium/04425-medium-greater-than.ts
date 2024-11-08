// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============
// Первый подход: Решает всё, кроме очень большого числа
// type GreaterThan<T extends number, U extends number, Acc extends 1[] = []> = 
//   T extends Acc['length']
//   ? false
//   : U extends Acc['length']
//     ? true
//     : GreaterThan<T, U, [1, ...Acc]>


// Второй подход: сравниваем длину, а затем число за числом. 
// Тут я сильно упоролся и написал миллион функций
// Подход работает с очень большими числами, оптимизировать этот ужас мне лень
type GreaterOneDigit<T extends number, U extends number, Acc extends 1[] = []> = 
  T extends Acc['length']
  ? false
  : U extends Acc['length']
    ? true
    : GreaterOneDigit<T, U, [1, ...Acc]>

type IsLonger<T extends number, U extends number> = GreaterOneDigit<LengthToArray<T>['length'], LengthToArray<U>['length']>

type Natural = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type NumberToArray<T extends string, Acc extends number[] = []> = 
  T extends `${infer H extends Natural}${infer R}`
  ? R extends ''
    ? [...Acc, H]
    : NumberToArray<R, [...Acc, H]>
  : Acc
  
type LengthToArray<T extends number, Acc extends 1[] = []> = 
  `${T}` extends `${string}${infer R}`
  ? R extends `${infer B extends number}` 
    ? LengthToArray<B, [1, ...Acc]> 
    : R extends ''
      ? [1, ...Acc]
      : R
  : T extends Natural
    ? [1, ...Acc]
    : Acc

type DigitByDigitArray<
  T extends number[],
  U extends number[]
  > = 
  T extends [infer THead extends number, ...infer TTail]
  ? U extends [infer Uhead extends number, ...infer UTail]
    ? GreaterOneDigit<THead, Uhead> extends true
      ? true
      : TTail extends number[]
        ? UTail extends number[]
          ? DigitByDigitArray<TTail, UTail>
          : false
        : false
    : false
  : false

type GreaterThan<T extends number, U extends number> = 
  IsLonger<T, U> extends true
  ? true
  : IsLonger<U, T> extends true
    ? false
    : DigitByDigitArray<NumberToArray<`${T}`>, NumberToArray<`${U}`>>