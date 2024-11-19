// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============
// Моё первое решение - работает со всем кроме эмодзи
// type CapitalizeWords<T extends string, shouldCapitalizeNext extends boolean = true> = 
//   T extends `${infer Head}${infer Rest}` 
//     ? Head extends Capitalize<Head> & Lowercase<Head>
//       ? `${Head}${CapitalizeWords<Rest, true>}`
//       : shouldCapitalizeNext extends true
//         ? `${Capitalize<Head>}${CapitalizeWords<Rest, false>}`
//         : `${Head}${CapitalizeWords<Rest, false>}`
//     : T

// В чём проблема с эмодзи?
type t = CapitalizeWords<'🤣qq'> // Внезапно `\uD83E\uDD23${any}`
// Это происходит потому, что деление строкового литерала в тайпскрипте происходит посимвольно, 
// а эмодзи занимает больше одного символа

type StringToUnion<T extends string> = 
  T extends `${infer Head}${infer Rest}` 
  ? Head | Uppercase<Head> | StringToUnion<Rest>
  : never
type LetterUnion = StringToUnion<'abcdefghijklmnopqrstuvwxyz'> // 'a' | 'A' | 'b' | 'B' etc


// Решение после видео, делает всё тоже самое
type CapitalizeWords<T extends string, Acc extends string = ''> = 
  T extends `${infer Head}${infer Rest}`                   // Делим строку
  ? Acc extends `${string}${LetterUnion}`                  // Смотрим был ли предыдущий символ буквой 
    ? CapitalizeWords<Rest, `${Acc}${Head}`>               // Если был, движемся дальше  
    : CapitalizeWords<Rest, `${Acc}${Capitalize<Head>}`>   // Если не был, делаем текущй символ заглавным
  : Acc                                                    // Когда строка кончается, возвращаем накопитель

// Почему тайпскрипт делит эмодзи на символы в первом варианте, а здесь не делит одному богу известно
