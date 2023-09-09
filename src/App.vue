<template>
  <section
    class="root"
    :class="theme"
  >
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  name: 'AppComponent',
  components: {},
  computed: {
    theme (): string {
      return 'light'
    },
  },
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  data () {
    return {}
  },
  methods: {
    async login () {
      const token = localStorage.getItem('neirodialog-token')

      if (!token) return false

      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`

      const data: any = await this.axios.post('user/check-token', { token, })

      if (data.user.role !== 'ADMIN' && data.user.role !== 'ROOT') {
        // eslint-disable-next-line no-console
        console.warn('Не достаточно прав')
        return false
      }

      data.token = token

      this.$store.dispatch('login', data)
    },
  },
  mounted () {
    this.login()
  },
})
</script>
