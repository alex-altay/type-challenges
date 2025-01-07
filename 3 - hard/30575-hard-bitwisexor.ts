// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]

// ============= Your Code Here =============
type StringToArray<T extends string, Acc extends unknown[] = []> = 
  T extends `${infer Head}${infer Rest}`
  ? [...Acc, Head, ...StringToArray<Rest>]
  : Acc

type ArrayToString<T extends unknown[], Acc extends string = ''> = 
  T extends [infer Head extends string, ...infer Rest]
  ? `${Acc}${Head}${ArrayToString<Rest>}`
  : Acc

type PadLeft<Long extends unknown[], Short extends unknown[]> = 
  Long['length'] extends Short['length']
  ? Short
  : PadLeft<Long, ['0', ...Short]>

type BitwiseXOR<
  S1 extends string, 
  S2 extends string,
  Long extends unknown[] = StringToArray<S1>,
  Short extends unknown[] = PadLeft<Long, StringToArray<S2>>,
  Acc extends unknown[] = [],
  Result extends string = ArrayToString<Acc>
> = 
  Long extends [infer LHead, ...infer LRest]
  ? Short extends [infer SHead, ...infer SRest]
    ? LHead extends SHead
      ? BitwiseXOR<S1, S2, LRest, SRest, [...Acc, '0']> 
      : BitwiseXOR<S1, S2, LRest, SRest, [...Acc, '1']>
    : never
  : Result
