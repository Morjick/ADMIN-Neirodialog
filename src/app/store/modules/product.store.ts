import { type ActionContext } from 'vuex'
import { type UserI } from './auth.store'
import axios from 'axios'

interface ProductI {
  id: number
  title: string
  description: string
  href: string
  basePrice: number
  discount: number | string
  price: number | string
  author: UserI
  show: boolean
  images: string[]
  videos: string[]
  responses: any
  avatar: string
}

interface ProductState {
  mainProducts: ProductI[]
  detailProduct: ProductI | null
  products: ProductI[]
}

const ProductStore = {
  state: (): ProductState => ({
    mainProducts: [],
    detailProduct: null,
    products: [],
  }),
  getters: {
    getMainProducts (state: ProductState) {
      return state.mainProducts
    },
    getDetailProduct (state: ProductState) {
      return state.detailProduct
    },
    getProducts (state: ProductState) {
      return state.products
    },
  },
  actions: {
    async fetchMainProducts (context: ActionContext<'S', 'R'>, queryString: string) {
      const { data, } = await axios.get(`product/get-many?${queryString}`)

      context.commit('setMainProducts', data.products)
    },
    async fetchDetailProduct (context: ActionContext<'S', 'R'>, href: string) {
      try {
        if (!href) return
        const { data, } = await axios.get(`product/get-one/${href}`)

        context.commit('setDetailProduct', data.product)
      } catch {
        context.commit('setDetailProduct', null)
      }
    },
    async fetchProduct (context: ActionContext<'S', 'R'>, queryString: string) {
      const { data, } = await axios.get(`product/get-many?${queryString}`)

      context.commit('setProducts', data.products)
    },
    async createOrder (context: ActionContext<'S', 'R'>) {
      await axios.post('order/create-order')
    },
  },
  mutations: {
    setMainProducts (state: ProductState, products: ProductI[]) {
      state.mainProducts = products
    },
    setDetailProduct (state: ProductState, product: ProductI) {
      state.detailProduct = product
    },
    setProducts (state: ProductState, products: ProductI[]) {
      state.products = products
    },
  },
}

export {
  ProductStore,
  type ProductI
}
