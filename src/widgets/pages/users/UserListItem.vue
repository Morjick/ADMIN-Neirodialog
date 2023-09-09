<template>
  <div class="user-list-item">
    <div style="width: 80px; font-weight: 800;">{{ item.id }}</div>
    <p style="min-width: 150px;">{{ item.firstname }}</p>
    <p style="min-width: 150px;">{{ item.lastname }}</p>
    <div
      style="min-width: 300px; display: flex; align-items: center; justify-content: space-between;"
    >
      <span>{{ item.email }}</span>
      <button
        style="max-width: 30px; min-width: 30px;"
        @click="copyEmail"
      >
        <img
          src="~/shared/assets/icons/edit.png"
          alt=""
        >
      </button>
    </div>
    <p
      style="min-width: 200px; margin-left: 20px;"
    >{{ item.banned ? 'Заблокирован' : 'Не заблокирован' }}</p>
    <p style="min-width: 100px;">{{ item.role }}</p>
    <router-link
      style="min-width: 250px;"
      :to="`/users/${item.id}`"
    >На страницу пользователя</router-link>
  </div>
</template>

<script lang="ts">
import { UserI } from 'app/store/modules/auth.store'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'UserListItem',
  data: () => ({}),
  components: {},
  props: {
    item: {
      type: Object as PropType<UserI>,
      required: true,
    },
  },
  computed: {},
  methods: {
    copyEmail () {
      navigator.clipboard.writeText(this.item.email)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.user-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  cursor: pointer;
  transition: all .2s;

  a {
    color: var(--primary-color);
  }
}
</style>
