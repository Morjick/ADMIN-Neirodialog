import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from 'app/layout/default.vue'

// pages
import { HomePage } from 'pages/home'
import { AuthPage } from 'pages/auth'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: DefaultLayout,
      path: '/',
      children: [
        { component: HomePage, path: '/', },
        { component: AuthPage, path: '/auth', },
      ],
    },
  ],
})
