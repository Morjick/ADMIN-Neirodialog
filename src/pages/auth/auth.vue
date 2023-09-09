<template>
  <section class="auth-page">
    <div class="auth-page__welcome">
      <img
        src="~/shared/assets/images/auth.jpg"
        alt=""
      >
    </div>
    <div class="auth-page__form">
      <p>Давайте авторизуемся!</p>
      <span
        v-if="errorMessage"
        class="auth-page__error-message"
      >{{ errorMessage }}</span>
      <ui-input
        v-model="email"
        placeholder="Введите логин"
        @enter-press="signIn"
      />
      <ui-input
        v-model="password"
        placeholder="Введите пароль"
        inputType="password"
        @enter-press="signIn"
      />

      <ui-button
        text="Авторизоваться"
        :disabled="isButtonAuthDisabled"
        @send="signIn"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiButton from 'widgets/ui/UiButton.vue'

export default defineComponent({
  name: 'AuthPage',
  components: { UiInput, UiButton, },
  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
  }),
  props: {},
  computed: {
    isButtonAuthDisabled (): boolean {
      return !(this.email.length && this.password.length)
    },
  },
  methods: {
    async signIn () {
      try {
        this.errorMessage = ''

        if (!this.email || !this.password) {
          this.errorMessage = 'Заполните все поля'
        }

        const data: any = await this.axios.post('user/sign-in', {
          email: this.email,
          password: this.password,
        })

        if (data.ok) {
          if (data.user.role !== 'ADMIN' && data.user.role !== 'ROOT') {
            this.errorMessage = 'У вас нет доступа админ панели'
          }

          localStorage.setItem('neirodialog-token', data.token)

          this.axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
          this.$store.dispatch('login', data.user)

          this.$router.push('/')
        }

        if (!data?.data?.ok) {
          this.errorMessage = data.data.message
        }

        this.$router.push('/')
      } catch (e: any) {
        const message = Array.isArray(e.response.data.message)
          ? e.response.data.message[0]
          : e.response.data.message
        if (message?.length) {
          this.errorMessage = message
        }
      }
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.auth-page {
  display: flex;
  justify-content: space-around;

  padding: 80px 40px;

  &__welcome {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 600px;

    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;

    background: var(--secondary-background-color);
    padding: 40px;
    border-radius: 6px;

    p {
      font-weight: 800;
      font-size: 20px;

      margin: 0;
    }

    .ui-input {
      margin-top: 40px;
    }

    .ui-button {
      margin-top: auto;
    }
  }

  &__error-message {
    display: block;

    color: var(--danger-color);

    margin: 40px 0;
  }
}
</style>
