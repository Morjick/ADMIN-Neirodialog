import { store } from 'app'
import axios from 'axios'

export default async function isAuth (): Promise<boolean> {
  try {
    const token = localStorage.getItem('neirodialog-token')

    if (!token) {
      return false
    }

    const data: any = await axios.post('/user/check-token', {
      token,
    })

    if (!data.ok) {
      return false
    }

    if (data.user.role !== 'ADMIN' && data.user.role !== 'ROOT') {
      // eslint-disable-next-line no-console
      console.warn('Не достаточно прав!!!')
      return false
    }

    return true
  } catch {
    store.commit('logout')
    return false
  }
}
