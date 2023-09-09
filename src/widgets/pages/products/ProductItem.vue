<template>
  <div class="product-item">
    <span class="product-item__id">{{ item.id }}</span>
    <div class="product-item__title">{{ item.title }}</div>
    <div class="product-item__buttons">
      <span @click="pushToProduct(item)">Редактировать</span>
      <span @click="deleteProduct(item)">Удалить</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductI } from 'app/store/modules/product.store'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductItem',
  data: () => ({}),
  components: {},
  props: {
    item: {
      type: Object as PropType<ProductI>,
      required: true,
    },
  },
  computed: {},
  methods: {
    deleteProduct (product: ProductI) {
      this.$emit('delete-product', product)
    },
    pushToProduct (product: ProductI) {
      this.$router.push(`/products-update/${product.href}`)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.product-item {
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 20px;
  padding: 0 0 20px;

  border-bottom: 1px solid var(--primary-color);

  &:first-child {
    margin-top: 40px;
  }

  &__id {
    width: 100px;
  }

  &__title {
    width: 100%;
  }

  &__buttons {
    span {
      margin-right: 40px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
