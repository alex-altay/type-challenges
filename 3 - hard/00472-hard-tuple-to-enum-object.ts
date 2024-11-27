// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
  Enum<typeof OperatingSystem>,
  {
    readonly MacOS: 'macOS'
    readonly Windows: 'Windows'
    readonly Linux: 'Linux'
  }
  >>,
  Expect<Equal<
  Enum<typeof OperatingSystem, true>,
  {
    readonly MacOS: 0
    readonly Windows: 1
    readonly Linux: 2
  }
  >>,
  Expect<Equal<
  Enum<typeof Command>,
  {
    readonly Echo: 'echo'
    readonly Grep: 'grep'
    readonly Sed: 'sed'
    readonly Awk: 'awk'
    readonly Cut: 'cut'
    readonly Uniq: 'uniq'
    readonly Head: 'head'
    readonly Tail: 'tail'
    readonly Xargs: 'xargs'
    readonly Shift: 'shift'
  }
  >>,
  Expect<Equal<
  Enum<typeof Command, true>,
  {
    readonly Echo: 0
    readonly Grep: 1
    readonly Sed: 2
    readonly Awk: 3
    readonly Cut: 4
    readonly Uniq: 5
    readonly Head: 6
    readonly Tail: 7
    readonly Xargs: 8
    readonly Shift: 9
  }
  >>,
]


// ============= Your Code Here =============
// Моё первое решение
// type Enum<T extends readonly string[], N extends boolean = false> = 
//   N extends true
//   ? EnumWithDigits<T>
//   : EnumWithStrings<T>

// type ExtractNumber<T> = T extends `${infer U extends number}` ? U : never
// type EnumWithDigits<T extends readonly string[]> = {
//   readonly [P in keyof T as T[P] extends string ? Capitalize<T[P]> : never]: ExtractNumber<P>
// }

// type EnumWithStrings<T> = 
//   T extends readonly [infer Head extends string, ...infer Rest]
//   ? Omit<{ readonly [P in Head as Head extends string ? Capitalize<Head> : never]: Head } &  EnumWithStrings<Rest>, 
//     never>
//   : {}

  // Моё второе весьма элегантное решение)
  type Enum<T extends readonly string[], N extends boolean = false> = {
    readonly [P in keyof T as P extends `${infer _ extends number}` ? Capitalize<T[P]> : never]: 
    N extends true 
    ? P extends `${infer U extends number}` ? U : never
    : T[P]
  }
