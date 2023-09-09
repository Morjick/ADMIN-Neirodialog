import { createStore } from 'vuex'
import { AuthStore } from './modules/auth.store'
import { CartStore } from './modules/cart.store'
import { ProductStore } from './modules/product.store'
import { ArticlesStore } from './modules/articles.store'

const store = createStore({
  modules: {
    auth: AuthStore,
    cart: CartStore,
    product: ProductStore,
    articles: ArticlesStore,
  },
})

export default store
