// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]


// ============= Your Code Here =============
// Голимое, но рабочее решение
// type PercentageParser<A extends string> = 
//   A extends `+${infer N}%`
//     ? ['+', N, '%']
//   : A extends `-${infer N}%`
//     ? ['-', N, '%']
//   : A extends `${infer N}%`
//     ? ['', N, '%']
//   :  A extends `+${infer N}`
//     ? ['+', N, '']
//   : A extends `-${infer N}`
//     ? ['-', N, '']
//   : ['', A, '']



// Получше
// type FirstSign<T> = 
//   T extends `${infer S}${infer R}`
//   ? S extends '+' | '-' 
//     ? [S, R] 
//     : ['', T]
//   : ['', T]

// type LastSign<T extends ['+' | '-' | '', string]> =
//   T[1] extends `${infer R}%`
//   ? [T[0], R, '%']
//   : [T[0], T[1], '']

// type PercentageParser<A extends string> = 
//   LastSign<FirstSign<A>>


type ParseSign<T extends string> = 
  T extends `${infer H extends '+' | '-'}${string}` 
  ? H 
  : ''

type ParseUnit<T extends string> = 
  T extends `${string}${infer R extends '%'}` 
  ? R
  : '' 

type ParseNumber<T extends string> = 
  T extends `${ParseSign<T>}${infer Body}${ParseUnit<T>}`
  ? Body
  : ''

type PercentageParser<A extends string> = [
  ParseSign<A>,
  ParseNumber<A>,
  ParseUnit<A>
]

