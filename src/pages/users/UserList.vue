<template>
  <div class="user-list">
    <h1 class="user-list__title">Пользователи</h1>

    <div class="user-list__search">
      <ui-input
        v-model="firstname"
        placeholder="Введите имя пользователя"
      />
      <ui-input
        v-model="lastname"
        placeholder="Введите фамилию пользователя"
      />
      <ui-button
        text="Искать"
        @send="searchUser"
      />
    </div>

    <div
      class="user-list__loader"
      v-if="!isPageLoad"
    >Загрузка, подождите...</div>
    <div
      class="user-list__body"
    >
      <user-list-item
        v-for="item in users"
        :key="item.id"
        :item="item"
      />
      <ui-pagination
        :pagination="pagination"
        :query="query"
        @update-pagination="getUserList"
      />
    </div>
    <div
      class="user-list__not-found"
      v-if="isPageLoad && !users.length"
    >Список пользователей путь</div>
  </div>
</template>

<script lang="ts">
import { UserI } from 'app/store/modules/auth.store'
import { defineComponent } from 'vue'
import { type PaginationI } from 'app/contracts/pagination'
import UserListItem from 'widgets/pages/users/UserListItem.vue'
import UiPagination from 'widgets/ui/UiPagination.vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiButton from 'widgets/ui/UiButton.vue'

export default defineComponent({
  name: 'UserList',
  data: () => ({
    isPageLoad: false,
    errorMessage: '',
    users: [] as UserI[],
    pagination: {} as PaginationI,
    limit: 5,
    firstname: '',
    lastname: '',
    query: {} as any,
  }),
  components: { UserListItem, UiPagination, UiInput, UiButton, },
  props: {},
  computed: {},
  methods: {
    async getUserList () {
      try {
        this.isPageLoad = false
        const limit = this.limit
        const activePage = Number(this.$route.query?.page) || 1
        const offset = (activePage - 1) * limit

        let query = ''

        if (this.$route.query.firstname) {
          query += `&firstname=${this.$route.query.firstname}`
        }
        if (this.$route.query.lastname) {
          query += `&lastname=${this.$route.query.lastname}`
        }

        const { users, pagination, ok, }: any =
          await this.axios.get(`user/get-many?limit=${limit}&offset=${offset}${query}`)

        if (!ok) {
          this.isPageLoad = true
          this.errorMessage = 'Произошла ошибка, попробуйте позже'
        }

        this.users = users
        this.pagination = { ...pagination, }

        this.isPageLoad = true
      } catch (e) {
        this.isPageLoad = true
      }
    },
    async searchUser () {
      this.isPageLoad = false

      this.query = {
        page: this.pagination.activePage,
      }

      if (this.firstname) {
        this.query.firstname = this.firstname
      }

      if (this.lastname) {
        this.query.lastname = this.lastname
      }

      this.$router.replace({
        query: this.query,
      })

      await this.getUserList()
    },
    createFilter () {
      this.firstname = this.$route.query.firstname as string || ''
      this.lastname = this.$route.query.lastname as string || ''

      if (this.firstname) this.query.firstname = this.firstname
      if (this.lastname) this.query.lastname = this.lastname
    },
  },
  mounted () {
    this.createFilter()
    this.getUserList()
  },
})
</script>

<style lang="scss">
.user-list {
  &__title {
    margin-bottom: 30px;
  }

  &__search {
    margin-bottom: 20px;

    .ui-input {
      margin-bottom: 30px;
    }
  }

  &__body {
    min-height: 500px;
  }
}
</style>
