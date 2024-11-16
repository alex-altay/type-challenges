// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from '../test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============
// Первое кривое решение, но рабочее решение
declare function VueBasicProps<
  Props,
  Data,
  Computed extends Record<PropertyKey, () => unknown>,
  Methods
>(options: {
  props: Props,
  data: (this: PropsTransformer<Props>) => Data,
  computed: Computed & ThisType<Data>,
  methods: Methods & ThisType<
    & Data 
    & PropsTransformer<Props> 
    & Methods 
    & { [P in keyof Computed]: ReturnType<Computed[P]>} >
}): unknown


type PropsTransformer<T> = {
  [P in keyof T]: 
    T[P] extends { type: infer R }
      ? R extends [...infer List extends unknown[]]
        ? PropTransformer<List[number]>
        : PropTransformer<R>
      : PropTransformer<T[P]>
}

type PropTransformer<T> = 
  T extends (...args: any) => infer PrimitiveConstructor // Вот эту вещь нужно знать или смотреть в спецификации - если поменять any на unknown[], то работать не будет
    ? PrimitiveConstructor
    : T extends new (...args: unknown[]) => infer ClassConstructor
      ? ClassConstructor
      : any