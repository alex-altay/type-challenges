// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


// ============= Your Code Here =============
declare function SimpleVue<
  Data,
  Computed extends Record<PropertyKey, () => unknown>,
  Methods
>(options: {
  data: (this: undefined) => Data,
  computed: Computed & ThisType<Data>,
  methods: 
  & Methods 
  & ThisType<
    & Data 
    & Methods 
    & { [P in keyof Computed]: ReturnType<Computed[P]> } 
    // Весь фокус в этой строчке, это mapped type c ключом computed и не самой computed функции, 
    // а результатом её выполнения
    >
}): unknown
