<template>
  <section class="home-page">
    <h1>Статистика</h1>
    <div class="param">
      <span>Всего пользователей:</span>
      <span>{{ statistic.users.userCount }}</span>
    </div>
    <div class="param">
      <span>Пользователей в этом месяце:</span>
      <span>{{ statistic.users.userCountInNowMounth }}</span>
    </div>
    <div class="param">
      <span>Пользователей в предыдущем месяце:</span>
      <span>{{ statistic.users.userCountInLastMounth }}</span>
    </div>
    <br>
    <div class="param">
      <span>Общее количество заказов:</span>
      <span>{{ statistic.orders.allOrdersCount }}</span>
    </div>
    <div class="param">
      <span>Заказов в этом месяце:</span>
      <span>{{ statistic.orders.ordersInNowMounth }}</span>
    </div>
    <div class="param">
      <span>Оплаченные заказы в этом месяце:</span>
      <span>{{ statistic.orders.payedInNowMounth }}</span>
    </div>
    <div class="param">
      <span>Сумма заказов в этом месяце:</span>
      <span>
        &#8381;
        {{
          String(statistic.orders.summOrdersInNowMounth)
            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        }}
      </span>
    </div>
    <div class="param">
      <span>Поступили средства в этом месяце:</span>
      <span>
        &#8381;
        {{
          String(statistic.orders.summOrdersInLastMounth)
            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        }}
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {},
  data: () => ({
    statistic: null as any,
  }),
  computed: {},
  methods: {
    async getStatistic () {
      const data: any = await this.axios.get('statistics/user-sign-up')

      this.statistic = data.statistic
    },
  },
  created () {},
  mounted () {
    this.getStatistic()
  },
})
</script>

<style lang="scss">
.home-page {
  h1 {
    margin-bottom: 40px;
  }

  .param {
    display: flex;
    align-items: center;

    span {
      &:first-child {
        font-weight: 800;
        margin-right: 12px;
      }
    }
  }
}
</style>
