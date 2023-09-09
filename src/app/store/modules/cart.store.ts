import axios from 'axios'
import { type UserI } from './auth.store'
import { type ProductI } from './product.store'
import { type ActionContext } from 'vuex'

interface CartItemI {
  id: number
  cartId: number
  itemId: number
  count: number
  item: ProductI
}

interface CartI {
  id: number
  cartId: number
  itemId: number
  count: number
  items: CartItemI[]
  user: UserI
  summ: number
}

interface CartStoreI {
  cart: CartI | null
  summ: number
}

interface AddProductToCartParamI {
  itemId: number
  count: number
}

const CartStore = {
  state: (): CartStoreI => ({
    cart: null,
    summ: 0,
  }),
  getters: {
    getCart (state: CartStoreI): CartI | null {
      return state.cart
    },
    getCartSumm (state: CartStoreI) {
      return state.summ
    },
  },
  actions: {
    async fetchCart (context: ActionContext<'S', 'R'>) {
      const { data, } = await axios.get('cart/get-cart')

      context.commit('setCart', data.cart)
      context.commit('setCartSum', data.summ)
    },
    async addToCart (context: ActionContext<'S', 'R'>, product: AddProductToCartParamI) {
      const { data, } = await axios.post('cart/add-item-cart', product)

      if (!data.ok) return true

      await context.dispatch('fetchCart')

      return true
    },
  },
  mutations: {
    setCart (state: CartStoreI, cart: CartI) {
      state.cart = cart
    },
    setCartSum (state: CartStoreI, summ: number) {
      state.summ = summ
    },
  },
}

export {
  CartStore,
  type CartItemI,
  type CartStoreI,
  type CartI
}
