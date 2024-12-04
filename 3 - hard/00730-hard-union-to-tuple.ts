// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]


// ============= Your Code Here =============
/*
Это ещё одна задача, в которой если ты не знаешь решение, то не решишь
Я могу обмануть условия. Так пройдут все тесты, но решение будет неправильным, нужны ещё:

type UnionToTuple<T, U = Exclude<T, undefined>> = [U] extends [infer X | infer Y] ? [X, Y] : never


А вот так выглядит настоящее решение. Оно основано на том же принципе, что и UnionToIntersection и использует
его же:
*/

// T = { a: 'a' } | { b: 'b' }, Intersection { a: 'a' } & { b: 'b' }
type UnionToIntersection<T> = 
  (T extends unknown ? (arg: T) => unknown : never) extends (arg: infer Intersection) => unknown 
  ? Intersection
  : never

// T = { a: 'a' } | { b: 'b' }, LastMember = { b: 'b' }
type LastUnionMember<T> = 
 UnionToIntersection<T extends unknown ? (arg: T) => unknown : never> extends (arg: infer LastMember) => unknown
  ? LastMember
  : never
 

type UnionToTuple<U, Last = LastUnionMember<U>> = 
  [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

// Вот по частям, чтобы было понятно, что происходит  
type twoUnion = {a: 'a'} | {b: 'b'}
type unionToFunction<T> = T extends unknown ? (arg: T) => unknown : never
type Functionized = unionToFunction<twoUnion> // ((arg: { a: "a"; }) => unknown) | ((arg: { b: "b"; }) => unknown)
type Intersectionized = UnionToIntersection<Functionized> // ((arg: { a: "a"; }) => unknown) & ((arg: {b: "b"; }) => unknown)
type LastOfPackedIntersection = Intersectionized extends (arg: infer LastMember) => unknown ? LastMember : never // { b: "b"; }


// Единственная разница между этими двумя типами в знаках: | vs &
// & даст последний элемент
// | даст intersection между аргументами

// { b: "b"; }
type LastElementDemo = 
  ((arg: {a: 'a'}) => void) & ((arg: {b: 'b'}) => void) extends (arg: infer Demo) => void 
  ? Demo
  : never 

// { a: "a"; } & { b: "b"; }
type IntersectionDemo = 
  ((arg: {a: 'a'}) => void) | ((arg: {b: 'b'}) => void) extends (arg: infer Demo) => void 
  ? Demo 
  : never

/*
Почему такое поведение? Я знаю объяснение про юнион функций, который превращается в пересечение
Логика такая: это 1 & 'a' === never
а функцию, которая принимает, что угодно и возвращает что угодно легко представить. Например для юниона функций
(arg: 1) => 3 | (arg: 'foo') => 3
Вполне можно найти какую-то общую функцию, которая будет принимать и 1, и foo, и возвращать всё что угодно

Почему в пересечении таких функций возвращается последний элемент, я могу только додумывать

Здесь используется этот прием
Шаг 1. Из юниона типов, создаешь intersection функций, аргумент в каждой из которых это один тип из юниона
Шаг 2. Зная, что из такого пересечения можно достать последний элемент - достаёшь
Шаг 3. Дальше дело техники: исключаешь, повторяешь
*/
