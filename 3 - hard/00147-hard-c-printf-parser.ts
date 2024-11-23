// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]


// ============= Your Code Here =============
type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

// Моё первое решение
// type FormatSymbol = ` %${keyof ControlsMap}` | `%%%${keyof ControlsMap}`
// type ParsePrintFormat<T, Acc extends string[] = []> = 
//   T extends `${FormatSymbol}${infer Rest extends string}`
//   ? T extends `${string}%%%${infer Letter extends keyof ControlsMap}${Rest}`
//     ? ParsePrintFormat<Rest, [...Acc, ControlsMap[Letter]]>
//     : T extends `${string}%${infer Letter extends keyof ControlsMap}${Rest}`
//       ? ParsePrintFormat<Rest, [...Acc, ControlsMap[Letter]]>
//       : T extends `${string}${infer Rest}`
//         ? ParsePrintFormat<Rest, Acc>
//         : Acc
//   : T extends `${string}${infer Tail}`
//     ? ParsePrintFormat<Tail, Acc>
//     : Acc

// Решение после видео
type ParsePrintFormat<T extends string, Acc extends string[] = []> = 
  T extends `${string}%${infer A}${infer Tail}`
  ? ParsePrintFormat<Tail, 
    A extends keyof ControlsMap
      ? [...Acc, ControlsMap[A]]
      : [...Acc]
    >
  : Acc
