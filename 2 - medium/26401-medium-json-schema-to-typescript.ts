// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: 'string'
}>
type Expected1 = string
type Result1 = Expect<Equal<Type1, Expected1>>

type Type2 = JSONSchema2TS<{
  type: 'number'
}>
type Expected2 = number
type Result2 = Expect<Equal<Type2, Expected2>>

type Type3 = JSONSchema2TS<{
  type: 'boolean'
}>
type Expected3 = boolean
type Result3 = Expect<Equal<Type3, Expected3>>
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: 'string'
  enum: ['a', 'b', 'c']
}>
type Expected4 = 'a' | 'b' | 'c'
type Result4 = Expect<Equal<Type4, Expected4>>

type Type5 = JSONSchema2TS<{
  type: 'number'
  enum: [1, 2, 3]
}>
type Expected5 = 1 | 2 | 3
type Result5 = Expect<Equal<Type5, Expected5>>
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: 'object'
}>
type Expected6 = Record<string, unknown>
type Result6 = Expect<Equal<Type6, Expected6>>

type Type7 = JSONSchema2TS<{
  type: 'object'
  properties: {}
}>
type Expected7 = {}
type Result7 = Expect<Equal<Type7, Expected7>>

type Type8 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
    }
  }
}>
type Expected8 = {
  a?: string
}
type Result8 = Expect<Equal<Type8, Expected8>>
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
  type: 'array'
}>
type Expected9 = unknown[]
type Result9 = Expect<Equal<Type9, Expected9>>

type Type10 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'string'
  }
}>
type Expected10 = string[]
type Result10 = Expect<Equal<Type10, Expected10>>

type Type11 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
  }
}>
type Expected11 = Record<string, unknown>[]
type Result11 = Expect<Equal<Type11, Expected11>>
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
      enum: ['a', 'b', 'c']
    }
    b: {
      type: 'number'
    }
  }
}>
type Expected12 = {
  a?: 'a' | 'b' | 'c'
  b?: number
}
type Result12 = Expect<Equal<Type12, Expected12>>

type Type13 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
    properties: {
      a: {
        type: 'string'
      }
    }
  }
}>
type Expected13 = {
  a?: string
}[]
type Result13 = Expect<Equal<Type13, Expected13>>
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
  type: 'object'
  properties: {
    req1: { type: 'string' }
    req2: {
      type: 'object'
      properties: {
        a: {
          type: 'number'
        }
      }
      required: ['a']
    }
    add1: { type: 'string' }
    add2: {
      type: 'array'
      items: {
        type: 'number'
      }
    }
  }
  required: ['req1', 'req2']
}>
type Expected14 = {
  req1: string
  req2: { a: number }
  add1?: string
  add2?: number[]
}
type Result14 = Expect<Equal<Type14, Expected14>>
// - Required fields


// ============= Your Code Here =============
type Schema = { type: unknown }

// Primitives
type Primitive = { type: 'string' | 'number' | 'boolean' }
type IsPrimitive<T> = T extends Primitive  ? true : false 
type ToPrimitive<T extends Schema> = 
    T['type'] extends 'string' ? string : 
    T['type'] extends 'number' ? number : 
    T['type'] extends 'boolean' ? boolean : 
    never

// Enums
interface Enum extends Primitive {
  enum: string[] | number[]
}
type IsEnum<T> = T extends Enum ? true : false
type ToEnum<T> = T extends Enum ? T['enum'][number] : never

// Arrays
type List = {
  type: 'array'
  items?: Primitive | Enum | ObjectType
}
type IsList<T> = T extends List ? true : false
type ToList<T> = 
  T extends List 
  ? T['items'] extends Schema 
    ? JSONSchema2TS<T['items']>[] 
    : unknown[]
  : never

// Objects
type ObjectType = {
  type: 'object'
  properties?: {}
  required?: string[] 
}
type IsObject<T> = T extends ObjectType ? true : false
type ToObject<T> = T extends ObjectType 
  ? keyof T['properties'] extends never
  ? T['properties'] extends {}
    ? {}
    : Record<string, unknown>
  : Properties<T>
  : never
  
type GetRequiredProperties<T extends ObjectType> = 
  T['required'] extends [...infer K]
  ? K[number]
  : never

type Properties<
  T extends ObjectType, 
  AllProperties = keyof T['properties'],
  RequiredProperties = GetRequiredProperties<T>
  > = Omit<
  {[P in RequiredProperties as P extends PropertyKey ? P : never]: Property<T, P>} & 
  {[P in Exclude<AllProperties, RequiredProperties> as P extends PropertyKey ? P : never]+?: Property<T, P>}
  , never>

type Property<T extends ObjectType, P> = 
  P extends keyof T['properties']
  ? T['properties'][P] extends Schema
    ? JSONSchema2TS<T['properties'][P]>
    : never
  : never

// Main type  
type JSONSchema2TS<T extends Schema> = 
  IsObject<T> extends true ? ToObject<T> :
  IsList<T> extends true ? ToList<T> : 
  IsEnum<T> extends true ? ToEnum<T> : 
  IsPrimitive<T> extends true ? ToPrimitive<T> : 
  never
