// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]


// ============= Your Code Here =============
// Моё решение
type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [P in keyof T]: 
    Extract<R, { mapFrom: T[P] }> extends never
      ? T[P]
      : Extract<R, { mapFrom: T[P] }>['mapTo']
}

// после видео
// type MapTypes<T extends {}, R extends { mapFrom: unknown, mapTo: unknown }> = {
//   [P in keyof T]: 
//     T[P] extends R['mapFrom']
//     ? R extends { mapFrom: T[P] }
//       ? R['mapTo']
//       : never // потому что T | never = T
//     : T[P]
// }
