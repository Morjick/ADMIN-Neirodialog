import { type UserI } from './auth.store'

interface ArticleI {
  id: 1
  title: string
  description: string
  body: string
  tags: string[]
  autor: UserI
  autorId: number
  show: boolean
  images: string[]
  avatar: string
  href: string
}

interface ArticlesStateI {
  articles: ArticleI[]
}

const ArticlesStore = {
  state: (): ArticlesStateI => ({
    articles: [],
  }),
  getters: {},
  actions: {},
  mutations: {},
}

export {
  ArticlesStore,
  type ArticlesStateI,
  type ArticleI
}
