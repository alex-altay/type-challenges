// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
type ResultToString<Result extends string[][], Acc extends string = ''> = 
  Result extends [infer Head extends string[], ...infer Rest extends string[][]]
  ? `${Head['length'] extends 1 ? '' : Head['length']}${Head[0]}${ResultToString<Rest>}`
  : Acc

type Repeat<
    Letter extends string, 
    Count extends number, 
    Acc extends 1[] = [], 
    Result extends string = ''
  > = 
    Acc['length'] extends Count
    ? Result
    : Repeat<Letter, Count, [1, ...Acc], `${Result}${Letter}`> 

    
namespace RLE {
  export type Encode<S extends string, Current extends string[] = [], Result extends string[][] = []> = 
    S extends `${infer Head}${infer Rest}`
    ? Current['length'] extends 0
      ? Encode<Rest, [Head], Result>
      : Current[0] extends Head
        ? Encode<Rest, [...Current, Head], Result>
        : Encode<Rest, [Head], [...Result, Current]>
    : ResultToString<[...Result, Current]>

  export type Decode<S extends string, Acc extends string = ''> = 
    S extends `${infer Count extends number}${infer Letter}${infer Rest}`
    ? Decode<Rest, `${Acc}${Repeat<Letter, Count>}`>
    : S extends `${infer Letter extends string}${infer Rest}`
      ? Decode<Rest, `${Acc}${Letter}`>
      : Acc
}
