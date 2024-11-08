// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]


// ============= Your Code Here =============
type FindAll<T extends string, P extends string, Counter extends 1[] = [], Acc extends unknown[] = []> = 
  T extends `${P}${infer Rest}`
  ? P extends `${infer _}${infer PRest}`
    ? FindAll<`${PRest}${Rest}`, P, [...Counter, 1], [...Acc, Counter['length']]>
    : []
  : T extends `${infer _}${infer Rest}`
    ? FindAll<Rest, P, [...Counter, 1], Acc>
    : Acc
