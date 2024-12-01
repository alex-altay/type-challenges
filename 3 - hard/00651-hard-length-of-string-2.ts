// ============= Test Cases =============
import type { Equal, IsTrue } from '../test-utils'

type cases = [
  IsTrue<Equal<LengthOfString<''>, 0>>,
  IsTrue<Equal<LengthOfString<'1'>, 1>>,
  IsTrue<Equal<LengthOfString<'12'>, 2>>,
  IsTrue<Equal<LengthOfString<'123'>, 3>>,
  IsTrue<Equal<LengthOfString<'1234'>, 4>>,
  IsTrue<Equal<LengthOfString<'12345'>, 5>>,
  IsTrue<Equal<LengthOfString<'123456'>, 6>>,
  IsTrue<Equal<LengthOfString<'1234567'>, 7>>,
  IsTrue<Equal<LengthOfString<'12345678'>, 8>>,
  IsTrue<Equal<LengthOfString<'123456789'>, 9>>,
  IsTrue<Equal<LengthOfString<'1234567890'>, 10>>,
  IsTrue<Equal<LengthOfString<'12345678901'>, 11>>,
  IsTrue<Equal<LengthOfString<'123456789012'>, 12>>,
  IsTrue<Equal<LengthOfString<'1234567890123'>, 13>>,
  IsTrue<Equal<LengthOfString<'12345678901234'>, 14>>,
  IsTrue<Equal<LengthOfString<'123456789012345'>, 15>>,
  IsTrue<Equal<LengthOfString<'1234567890123456'>, 16>>,
  IsTrue<Equal<LengthOfString<'12345678901234567'>, 17>>,
  IsTrue<Equal<LengthOfString<'123456789012345678'>, 18>>,
  IsTrue<Equal<LengthOfString<'1234567890123456789'>, 19>>,
  IsTrue<Equal<LengthOfString<'12345678901234567890'>, 20>>,
  IsTrue<Equal<LengthOfString<'123456789012345678901'>, 21>>,
  IsTrue<Equal<LengthOfString<'1234567890123456789012'>, 22>>,
  IsTrue<Equal<LengthOfString<'12345678901234567890123'>, 23>>,
  IsTrue<Equal<LengthOfString<'aaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>, 272>>,
  IsTrue<Equal<LengthOfString<'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'>, 999>>,
]


// ============= Your Code Here =============
// Смысл этой задачки, в ограничении на глубину рекурсии тайпскрипта. 
// Оно увеличивается, раньше было 45 для общих случаев и 999 для TailOptimisation cases 
// на момент решения задачки, просто решение работает для 90 и уже не работает для 91

type LHelper<T extends string> = T extends `${string}${infer Tail}` ? [1, ...LHelper<Tail>] : []
type LengthOfStringSimple<T extends string> = LHelper<T>['length']
const s45 = 'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde'
const s90 =  'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde'
const s91 = 'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdea'
type test45 = LengthOfStringSimple<typeof s45>
type test90 = LengthOfStringSimple<typeof s90>
// @ts-expect-error
type test91 = LengthOfStringSimple<typeof s91>


// Соответственно смысл решения - в сокращении глубины рекурсии. 
// В начале сокращаем на сотни, потом сотни на десятки, остальное обычным перебором

type Ten<T extends string> = 
  T extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer Tail}`
  ? Tail
  : ''

type Hundred<T extends string> =
  T extends `
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}
  ${infer Tail}` 
  ? Tail : ''

type TenArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
type HundredArray = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]

type LengthOfString<T extends string, Acc extends 1[] = []> = 
  Hundred<T> extends `${infer Tail}`
  ? Tail extends ''
    ? [...Acc, ...CountLessThanHundred<T>]['length']
    : LengthOfString<Tail, [...Acc, ...HundredArray]>  
  : []

type CountLessThanHundred<T extends string, Acc extends 1[] = []> = 
  Ten<T> extends `${infer Tail}`
  ? Tail extends ''
    ? [...Acc, ...CountLessThanTen<T>]
    : CountLessThanHundred<Tail, [...Acc, ...TenArray]>
  : []

type CountLessThanTen<T extends string, Acc extends 1[] = []> = 
  T extends `${string}${infer Tail}`
  ? Tail extends ''
    ? [...Acc, 1] 
    : CountLessThanTen<Tail, [...Acc, 1]>
  : []

// Такое решение увеличивает глубину рекурсии до почти 10 000. Вот дополнительные тест кейсы
const s1000 = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
const s2000 = `${s1000}${s1000}`
const s5000 = `${s1000}${s1000}${s1000}${s1000}${s1000}`
const s9000 = `${s5000}${s1000}${s1000}${s1000}${s1000}`
const s10000 = `${s5000}${s5000}`

type s1000 = LengthOfString<typeof s1000>
type s2000 = LengthOfString<typeof s2000>
type s5000 = LengthOfString<typeof s5000>
type s9000 = LengthOfString<typeof s9000> // 9 тысяч ещё ок
// @ts-expect-error
type s10000 = LengthOfString<typeof s10000> // number вместо 10 000
