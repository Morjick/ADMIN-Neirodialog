<template>
  <div class="order-page">
    <div class="order-page__header">
      <h1>Заказы</h1>
      <ui-select
        :items="querySearchItems"
        text-value="title"
        active-value="code"
        :default-value="querySearchItems[0]"
        @select="getOrders"
      />
    </div>
    <div
      class="order-page__list"
      v-if="!orderLoading && orders.length"
    >
      <order-item
        v-for="item in orders"
        :key="item.id"
        :order="item"
        @update-order-status="getOrders"
      />
    </div>
    <div v-if="!orderLoading && !orders.length">
      Заказов пока нет
    </div>
    <div v-if="orderLoading">Загрузка, подождите...</div>
  </div>
</template>

<script lang="ts">
import { OrderI } from 'app/store/modules/auth.store'
import { defineComponent } from 'vue'
import OrderItem from 'widgets/pages/orders/OrderItem.vue'
import UiSelect from 'widgets/ui/UiSelect.vue'

export default defineComponent({
  name: 'OrderPage',
  data: () => ({
    orders: [] as OrderI[],
    orderLoading: true,
    querySearchItems: [
      {
        title: 'Все статусы',
        code: '',
      },
      {
        title: 'Выполнены',
        code: '?status=DONE',
      },
      {
        title: 'Доставляется',
        code: '?status=IN DELIVERY',
      },
      {
        title: 'Закрыт',
        code: '?status=CLOSED',
      },
      {
        title: 'Есть ошибка',
        code: '?status=HAS ERROR',
      },
    ],
  }),
  components: { OrderItem, UiSelect, },
  props: {},
  computed: {},
  methods: {
    async getOrders (orderSearchQuery = '') {
      this.orderLoading = true

      const data: any = await this.axios.get(`order/get-orders${orderSearchQuery}`)

      this.orders = data.orders
      this.orderLoading = false
    },
  },
  mounted () {
    this.getOrders()
  },
})
</script>

<style lang="scss">
.order-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 40px;

    h1 {
      margin-bottom: 40px;
    }

    .ui-select {
      min-width: 350px;
    }
  }
}
</style>
