import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from 'app/layout/default.vue'
import AuthLayout from 'app/layout/AuthLayout.vue'

// pages
import { HomePage } from 'pages/home'
import { AuthPage } from 'pages/auth'
import { isAuth } from 'features/middleware'
import { CreateProductPage, ProductPage, UpdateProductPage } from 'pages/products'
import { OrderPage } from 'pages/orders'
import { UserList, UsersPage } from 'pages/users'
import { ArticlesPage, CreateArticlePage, UpdateArticlePage } from 'pages/articles'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: DefaultLayout,
      path: '/admin',
      children: [
        { component: HomePage, path: '/', name: 'Home', },
        { component: ProductPage, path: '/admin/products', name: 'Products', },
        { component: CreateProductPage, path: '/admin/products-create', name: 'ProductsCreate', },
        {
          component: UpdateProductPage,
          path: '/admin/products-update/:href',
          name: 'ProductsUpdate',
        },
        { component: OrderPage, path: '/admin/orders', name: 'Order', },
        { component: UsersPage, path: '/admin/users/:id', name: 'User', },
        { component: UserList, path: '/admin/users-list', name: 'UserList', },
        { component: ArticlesPage, path: '/admin/articles', name: 'Articles', },
        { component: CreateArticlePage, path: '/admin/articles/create', name: 'ArticleCreate', },
        {
          component:
          UpdateArticlePage,
          path: '/admin/articles/update/:href',
          name: 'ArticleUpdate',
        },
      ],
    },
    {
      component: AuthLayout,
      path: '/admin/auth',
      children: [
        { component: AuthPage, path: 'sign-in', name: 'SignIn', },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = await isAuth()

  if (!auth && to.name !== 'SignIn') {
    next({ name: 'SignIn', })
  } else next()
})
