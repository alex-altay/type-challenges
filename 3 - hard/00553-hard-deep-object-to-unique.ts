// ============= Test Cases =============
import type { Equal, IsFalse, IsTrue } from '../test-utils'

type Quz = { quz: 4 }

type Foo = { foo: 2; baz: Quz; bar: Quz }
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } }

type UniqQuz = DeepObjectToUniq<Quz>
type UniqFoo = DeepObjectToUniq<Foo>
type UniqBar = DeepObjectToUniq<Bar>

declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo
foo = uniqFoo

type cases = [
  IsFalse<Equal<UniqQuz, Quz>>,
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo['foo'], Foo['foo']>>,
  IsTrue<Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']>>,
  IsFalse<Equal<UniqQuz, UniqFoo['baz']>>,
  IsFalse<Equal<UniqFoo['bar'], UniqFoo['baz']>>,
  IsFalse<Equal<UniqBar['baz'], UniqFoo['baz']>>,
  IsTrue<Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>,
]


// ============= Your Code Here =============
// Это было правда сложно и потребовалось часа полтора наверное, но я её решил

// Вначале в чём смысл 
/*
Система типов в Typescript - структурная. Это означает, что два объекта, 
обладающие одной и той же структурой будут равными и взаимозаменяемыми

type Username = string
type Password = string
function login(username: Username, password: Password) {}

при вызове функции login можно легко перепутать аргументы и компилятор ничего не заметит, не выдаст никакой ошибки
const loginResult = login('qwerty', 'myUser') // ничего не упадет

В номинальной системе типы с одной и той же структурой не равны друг другу
В языках типа Flow есть специальный синтаксис для производства так называемых opaque типов (непрозрачных, но это
неудачный перевод). Там это выглядит как:
opaque type Username = string;

Подставить другую строку в функцию логин с таким типом уже не получится, компилятор потребует именно тип Username

До какой-то степени в Typescript можно имитировать opaque типы путем добавления полей / использования enum 
и других костылей. Это может выглядеть например так:

type Opaque<K, T> = T & { __TYPE__: K }
type AccountNumber = Opaque<"AccountNumber", number>

Подробнее можно почитать здесь: https://codemix.com/opaque-types-in-javascript/

Но в этой задачке нужно сделать типы уникальными, сохранив тот же список полей, плюс сделать это рекурсивно
*/

// Р Е Ш Е Н И Е
declare const uniqueSymbol: unique symbol;
type DeepObjectToUniq<T extends object, U = T> = {
  [P in keyof T]: T[P] extends object ? DeepObjectToUniq<T[P], Omit<T, P>> : T[P]
} & { [uniqueSymbol]?: U };


/* Объяснение каждой из четырех строчек
1 Символ может быть ключом объекта, наряду со строками и числами, 
при этом сам символ не доступен по его значению

const x = Symbol('foo')
const object = {
  [x]: 'bar'
}

object['foo'] // нет
object[x] // только так

и соответственно символ не отображается в списке ключей

2 Наша основная проблема как уже можно догадаться, это установить для пары ключ-значение, где ключ символ, 
какое-то уникальное значение, чтобы вложенный объект такой же структуры имел разное значение 
по сравнению с таким же самостоятельным объектом или будучи частью в другом объекте. 
Поэтому мы добавляем аргумент U, который используем дальше - это просто копия T к которому не применяется дистрибуция

3 В идеальном мире мы могли бы генерировать псевдо-уникальное значение через какой-нибудь Math.random(), 
но здесь у нас такой возможности нет, поэтому мы присваиваем копию самого объекта

4 Делая наше новое поле с уникальным символом опциональным мы сохраняем возможность переприсваивания значений 
declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo
foo = uniqFoo

они взаимозаменяемы, но не идентичны
*/


/* 
PS Важное дополнение
Я могу придумать тест кейс, который эта реализация не пройдет
Например:
*/

type Part = { quz: 4 }
type Whole = { foo: 2; baz: Part; bar: Part }
type UniqSame = DeepObjectToUniq<Whole>
type UniqSame2 = DeepObjectToUniq<Whole>

type falseCase = [
  // @ts-expect-error
  IsFalse<Equal<UniqSame['bar'], UniqSame2['bar']>>,
]

/*
По идее каждый из этих типов должен быть уникальным
Но задача от нас требует только разницы между оригинальным объектом и результатом DeepObjectToUniq
*/

/* Что я узнал посмотрев видео, после того как решил:

type DeepObjectToUniq<T extends object, U = T> = {
  [P in keyof T]: T[P] extends object ? DeepObjectToUniq<T[P]> : T[P] 
  // Необязательно делать Omit, ведь дефолтовое значение и присвоит его в U
} & { [key: symbol]: U }; Необязательно объявлять тип символа заранее, можно просто указать в ключе

В остальном всё тоже самое, видимо других способов решить это нет
*/