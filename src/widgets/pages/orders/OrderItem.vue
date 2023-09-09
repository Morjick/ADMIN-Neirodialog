<template>
  <div
    class="order-item"
    :style="{
      backgroundColor: getOrderStatus(order.status).color,
    }"
    :class="{
      active
    }"
  >
    <div
      class="order-item__header"
      @click="toggleActive"
    >
      <div class="order-item__title">Заказ от {{ getOrderDate(order.createdAt) }}</div>
      <img
          src="~/shared/assets/icons/arrow-down.png"
          alt=""
      >
    </div>
    <div class="order-item__body">
      <div class="order-item__param">
        <span class="title">Заказчик:</span>
        <router-link :to="`/users/${order.user.id}`">
          {{ order.user.firstname }} {{ order.user.lastname }}
        </router-link>
      </div>
      <div class="order-item__param">
        <span class="title">Статус: </span>
        <ui-select
          :items="statuses"
          :default-value="getOrderStatus(order.status)"
          text-value="title"
          active-value="code"
          @select="setOrderStatus"
        />
      </div>
      <div class="order-item__param">
        <span class="title">Сумма: </span>
        <span>&#8381; {{ String(order.summ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}</span>
      </div>
      <div class="order-item__param block">
        <span class="title">Продукты: </span>
        <div class="products">
          <div
            class="products__item"
            v-for="product in order.cart?.items"
            :key="product.id"
          >
            <a
              :href="`${site}/product/${product.item.href}`"
              target="_blank"
            >
              {{ product.item.title }}
            </a> x {{ product.count }} шт
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderI } from 'app/store/modules/auth.store'
import {
  getDate, getStatus, OrderStatusResult, OrderStatusEnum, statuses, StatusItemI
} from 'features/order'
import { PropType, defineComponent } from 'vue'
import UiSelect from 'widgets/ui/UiSelect.vue'

export default defineComponent({
  name: 'OrderItem',
  data: () => ({
    active: false,
  }),
  components: { UiSelect, },
  props: {
    order: {
      type: Object as PropType<OrderI>,
      required: true,
    },
  },
  computed: {
    site () {
      return this.$store.getters.getOficialSite
    },
    statuses (): StatusItemI[] {
      return statuses
    },
  },
  methods: {
    getOrderDate (date: string) {
      return getDate(date)
    },
    getOrderStatus (status: OrderStatusEnum): OrderStatusResult {
      return getStatus(status)
    },
    async setOrderStatus (status: OrderStatusEnum) {
      const data: any = await this.axios.post('order/set-status', {
        orderId: this.order.id,
        status,
      })

      if (data.ok) {
        this.$emit('update-order-status')
      }
    },
    toggleActive () {
      this.active = !this.active
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.order-item {
  max-height: 45px;

  margin-bottom: 40px;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 0 5px 0 var(--primary-background-alternative-color);

  overflow: hidden;
  cursor: pointer;
  transition: all .4s;

  &.active {
    // min-height: 450px;
    max-height: 9000px;
    overflow-y: auto;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__body {
    // overflow-y: auto;
    transition: all .2s;
  }

  &__title {
    font-weight: 800;
    margin-bottom: 10px;
  }

  &__param {
    display: flex;
    align-items: center;

    margin-bottom: 5px;

    &.block {
      display: block;
    }

    .title {
      font-weight: 800;
      margin-right: 10px;
    }

    .products {
      margin-left: 20px;

      &__item {
        margin-top: 10px;
      }
    }

    a {
      color: var(--primary-color);
    }
  }
}
</style>
