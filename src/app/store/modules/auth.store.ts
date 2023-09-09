import { type ActionContext } from 'vuex'
import { type ProductI } from './product.store'
import axios from 'axios'
import { router } from 'app/router/router'
import { type OrderStatusEnum } from 'features/order/getStatus'

interface CartItemI {
  id: number
  cartId: number
  itemId: number
  count: number
  item: ProductI
}

interface CartI {
  id: number
  userId: number
  user: UserI
  items: CartItemI[]
}

interface OrderI {
  id: number
  userId: number
  cartId: number
  summ: number
  needPay: boolean
  user: UserI
  cart: CartI
  createdAt: string
  status: OrderStatusEnum
}

interface AddressI {
  id: number
  userId: number
  address: string
}

interface UserI {
  id: number
  firstname: string
  lastname: string
  email: string
  city: string
  role: string
  cart: CartI
  orders: any
  address: AddressI
  avatar: string
  createdAt: string
  banned: boolean
  banReason: string
}

interface AuthStoreState {
  isAuth: boolean
  mainUser: UserI | null
  token: string
  cart: any
  ssrTest?: string
  context?: any
  orders: OrderI[]
  oficialSite: string
}

const AuthStore = {
  state: (): AuthStoreState => ({
    isAuth: false,
    mainUser: null,
    token: '',
    cart: [],
    ssrTest: 'no prefetch',
    context: {},
    orders: [],
    oficialSite: 'http://localhost/:3000',
  }),
  getters: {
    getMainUser (state: AuthStoreState): UserI | null {
      return state.mainUser
    },
    getisAuth (state: AuthStoreState): boolean {
      return state.isAuth
    },
    getToken (state: AuthStoreState): string {
      return state.token
    },
    getSsrTest (state: AuthStoreState) {
      return state.ssrTest
    },
    getAddress (state: AuthStoreState) {
      return state.mainUser ? state.mainUser.address : []
    },
    getOrders (state: AuthStoreState) {
      return state.orders
    },
    getOficialSite (state: AuthStoreState) {
      return state.oficialSite
    },
  },
  actions: {
    login (context: ActionContext<'S', 'R'>, data: any) {
      if (data.user.role !== 'ADMIN' && data.user.role !== 'ROOT') return false
      context.commit('setToken', data.token)
      context.commit('setMainUser', data.user)
      context.commit('setIsAuth', true)
    },
    async checkToken (context: ActionContext<'S', 'R'>, token: string) {
      if (!token) {
        return
      }

      const data: any = await axios.post('user/check-token')

      await context.dispatch('login', data)
    },
    async logout (context: ActionContext<'S', 'R'>) {
      context.commit('setToken', '')
      context.commit('setMainUser', null)
      context.commit('setIsAuth', false)
      context.commit('setCart', [])

      await router.push('/auth/sign-in')
    },
    async getOrders (context: ActionContext<'S', 'R'>) {
      const { data, } = await axios.get('order/get-many')

      context.commit('setOrders', data.orders)
    },
  },
  mutations: {
    setToken (state: AuthStoreState, token: string) {
      state.token = token
    },
    setMainUser (state: AuthStoreState, user: UserI) {
      state.mainUser = user
    },
    setIsAuth (state: AuthStoreState, key: boolean) {
      state.isAuth = key
    },
    setCart (state: AuthStoreState, cart: any) {
      state.cart = cart
    },
    setSsrTest (state: AuthStoreState, { value, context, }: any) {
      state.ssrTest = value
      state.context = context
    },
    setOrders (state: AuthStoreState, orders: OrderI[]) {
      state.orders = orders.reverse()
    },
  },
}

export {
  AuthStore,
  type UserI,
  type AuthStoreState,
  type OrderI,
  type AddressI,
  type CartItemI,
  type CartI
}
