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
  methods: {},
  mounted () {},
})
</script>
