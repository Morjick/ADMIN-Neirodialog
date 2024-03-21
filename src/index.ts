import { router, store } from 'app'
import { createApp, h } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import CKEditor from '@ckeditor/ckeditor5-vue'
import 'shared/assets/styles/main.scss'

const app = createApp({
  render: () => h(App),
})

function createErrorHandler (): any {
  try {
    app.config.errorHandler = () => {
      void router.push('/')
    }
  } catch (error: any) {
    void router.push('/server-error')
    return error
  }
}

createErrorHandler()

axios.defaults.baseURL = 'http://78.24.181.93/api/'
axios.interceptors.response.use(
  (res: any) => res.data,
  async (err: any) => {
    try {
      if (err.status >= 500 && err.status <= 600) {
        void router.push('/server-error')
      } else if (err.status >= 305 && err.status <= 400) {
        void router.push('')
      } else if (err.status === 401 || err.status === 404) {
        await store.dispatch('logout')
        void router.push('/auth')
      } else {
        return err.response
      }
    } catch (error: any) {
      void router.push('/server-error')
      return error
    }
  }
)

app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(CKEditor)

app.mount('#app')
