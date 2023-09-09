<template>
  <div class="users-page">
    <p v-if="pageLoading">Подождите, загрузка...</p>
    <div
      class="users-page__details"
      v-else-if="user"
    >
      <h1>{{ user.firstname }} {{ user.lastname }}</h1>
      <div class="users-page__content">
        <div class="avatar">
          <img
            :ref="(el: any) => getAvatar(user?.avatar, el)"
            alt=""
          >
        </div>
        <div class="body">
          <div class="param">
            <span>Почта: </span>
            <span>{{ user.email || 'Не указана' }}</span>
          </div>
          <div class="param">
            <span>Город: </span>
            <span>{{ user.city || 'Не указан' }}</span>
          </div>
          <div
            class="param"
            style="display: flex; align-items: center;"
          >
            <span>Роль: </span>
            <!-- <span>{{ user.role }}</span> -->
            <ui-select
              :items="roles"
              :default-value="userRole"
              style="margin-left: 10px;"
              placeholder="Подгружаем роль"
              active-value="title"
              @select="setRole"
            />
          </div>
          <div class="param">
            <span>Зарегистрирован: </span>
            <span>{{ getCreatedAt(user.createdAt) }}</span>
          </div>
          <div class="param">
            <span>Заблокирован: </span>
            <span>{{ user.banned ?'Да' : 'Нет' }}</span>
          </div>
          <div
            class="param"
            v-if="user.banned"
          >
            <span>Причиная блокировки: </span>
            <span>{{ user.banReason }}</span>
          </div>

          <div
            class="activision"
            v-if="!user.banned"
          >
            <p>Заблокировать пользователя:</p>
            <ui-input
              v-model="bannReason"
              placeholder="Укажите причину блокировки"
            />
            <ui-button
              text="Заблокировать"
              @send="bannUser"
            />
          </div>
          <div
            class="activision"
            v-if="user.banned"
          >
            <ui-button
              text="Разблокировать"
              @send="bannUser(false)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserI } from 'app/store/modules/auth.store'
import { checkImage } from 'features/check-image'
import { getDate } from 'features/order'
import { defineComponent } from 'vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiButton from 'widgets/ui/UiButton.vue'
import UiSelect from 'widgets/ui/UiSelect.vue'

export default defineComponent({
  name: 'UsersPage',
  data: () => ({
    user: null as UserI | null,
    pageLoading: true,
    bannReason: '',
  }),
  components: { UiInput, UiButton, UiSelect, },
  props: {},
  computed: {
    roles () {
      return [
        {
          id: 1,
          title: 'USER',
        },
        {
          id: 2,
          title: 'ADMIN',
        },
      ]
    },
    userRole () {
      return this.roles.find(el => el.title === this.user?.role)
    },
  },
  methods: {
    async getUser () {
      if (!this.$route.params.id) {
        this.$router.push('/')
      }

      const data: any = await this.axios.get(`user/get-user/${this.$route.params.id}`)

      this.user = data.user
      this.pageLoading = false
    },
    async getAvatar (avatar: any, el: any) {
      const image = await checkImage(avatar)
      el?.setAttribute('src', image)
    },
    getCreatedAt (date: string) {
      return getDate(date)
    },
    async bannUser (banned: boolean = true) {
      const data: any = await this.axios.post('user/ban-user', {
        userId: this.user?.id,
        banned,
        reason: this.bannReason,
      })

      if (data.ok) {
        this.getUser()
      }
    },
    async setRole (role: string) {
      await this.axios.post('user/set-role', {
        userId: this.user?.id,
        role,
      })
    },
  },
  mounted () {
    this.getUser()
  },
})
</script>

<style lang="scss">
.users-page {
  &__content {
    display: flex;

    margin-top: 40px;

    .avatar {
      max-width: 500px;
      margin-right: 50px;

      img {
        width: 100%;
      }
    }

    .body {
      .param {
        margin-bottom: 10px;

        span {
          &:first-child {
            font-weight: 800;
          }

          &:last-child {
            color: var(--font-subtitle-color);
          }
        }
      }

      .activision {
        margin-top: 50px;

        p {
          margin-bottom: 20px;
          font-weight: bold;
        }

        .ui-input, .ui-button {
          display: inline-block;
        }

        .ui-input {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
