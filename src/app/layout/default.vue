<template>
  <div class="pages">
    <div class="pages__aside">
      <div class="pages__logo">Админ панель <br> <span>неиродиалог</span></div>
      <div class="pages__menu">
        <router-link
          class="pages__item"
          v-for="item in menu"
          :key="item.id"
          :to="item.path"
          :class="{
            active: item.path === $route.path
          }"
        >
          {{ item.title }}
        </router-link>
      </div>
      <ui-button
        text="Выйти"
        mode="danger"
        style="margin: 20px 20px 0;"
        @send="logout"
      />
    </div>
    <div class="pages__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import UiButton from 'widgets/ui/UiButton.vue'

export default {
  name: 'DefaultLayout',
  components: { UiButton, },
  data: () => ({
    menu: [
      {
        id: 1,
        title: 'Главная',
        path: '/admin',
      },
      {
        id: 2,
        title: 'Статьи',
        path: '/admin/articles',
      },
      {
        id: 3,
        title: 'Продукты',
        path: '/admin/products',
      },
      {
        id: 4,
        title: 'Заказы',
        path: '/admin/orders',
      },
      {
        id: 5,
        title: 'Пользователи',
        path: '/admin/users-list',
      },
    ],
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'SignIn', })
    },
  },
  computed: {},
  created () {},
}
</script>

<style lang="scss">
$asideWidth: 400px;
$bodyMargin: 40px;

.pages {
  display: flex;

  &__logo {
    text-align: center;
    color: var(--font-alternative-color);
    letter-spacing: 2px;
    margin: 40px 0;

    span {
      color: var(--primary-color);
      text-transform: uppercase;
      font-size: 34px;
      font-weight: 800;
      text-shadow: 0 0 5px var(--primary-color);
      font-family: 'Manrope', sans-serif;
      letter-spacing: 5px;
    }
  }

  &__aside {
    width: $asideWidth;
    height: 100vh;
    background: var(--primary-background-alternative-color);
    box-shadow: 0 0 5px 5px var(--primary-color);
  }

  &__menu {
    display: flex;
    flex-direction: column;

    padding: 0 20px;
  }

  &__item {
    display: block;
    width: 100%;

    color: var(--font-alternative-color);
    background: var(--secondary-background-alternative-color);

    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: 6px;
    transition: transform .2s;

    &.active {
      box-shadow: 0 0 5px 0 var(--primary-color);
    }
  }

  &__content {
    width: calc(100vw - ($bodyMargin * 2) - $asideWidth);
    height: calc(100vh - $bodyMargin);

    overflow-y: auto;
    padding: $bodyMargin;
    margin-top: calc($bodyMargin / 2);
  }
}
</style>
