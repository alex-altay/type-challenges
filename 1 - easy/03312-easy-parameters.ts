// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const foo = (arg1: string, arg2: number): undefined => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]


// ============= Your Code Here =============
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type x = MyParameters<typeof foo>
type y = Parameters<typeof foo>

type CustomReturnType<T> = T extends (...args: any[]) => infer P ? P : never
type z = CustomReturnType<typeof foo>
type w = CustomReturnType<typeof bar>



type ExampleType = Promise<string>
type MyAwaited<T extends PromiseLike<unknown>> = T extends PromiseLike<infer I> ? I : never
type Result = MyAwaited<ExampleType> // string