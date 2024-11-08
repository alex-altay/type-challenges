// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
// Первое рабочее
type Chunk<T extends unknown[], N extends number> = ChunkInternal<T, N, []>
type ChunkInternal<T extends unknown[], N extends number, CurrentChunk extends unknown[] = []> = 
  T extends [infer Head, ...infer Tail]
  ? [...CurrentChunk, Head]['length'] extends N
    ? [[...CurrentChunk, Head], ...ChunkInternal<Tail, N, []>]
    : ChunkInternal<Tail, N, [...CurrentChunk, Head]>
  : CurrentChunk['length'] extends 0 
    ? CurrentChunk
    : [CurrentChunk]




type t0 = Chunk<[], 1>
type t1 = Chunk<[1, 2, 3], 1>
type t2 = Chunk<[1, 2, 3], 2>
type t3 = Chunk<[1, 2, 3, 4], 2>
type t4 = Chunk<[1, 2, 3, 4], 5>
type t5 = Chunk<[1, true, 2, false], 2>