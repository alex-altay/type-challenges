// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]

// ============= Your Code Here =============
type SnakeCase<T extends string, Acc extends string = ''> = 
  T extends `${infer Letter}${infer Rest}`
  ? Letter extends Uppercase<Letter>
    ? SnakeCase<Rest, `${Acc}${Acc extends '' ? '' : '_'}${Lowercase<Letter>}`>
    : SnakeCase<Rest, `${Acc}${Letter}`>
  : Acc
