<template>
  <div class="products-page">
    <div class="products-page__header">
      <h1>Продукты</h1>
      <ui-button
        text="Добавить"
        :loading="addProductButtonLoading"
        @send="addProduct"
      />
    </div>
    <div
      class="products-page__list"
      v-if="products.length"
    >
      <product-item
        v-for="item in products"
        :key="item.id"
        :item="item"
        @delete-product="deleteProduct"
      />
    </div>
    <p
      style="margin: 50px 0;"
      v-else
    >Загрзука, подождите...</p>
  </div>
</template>

<script lang="ts">
import { ProductI } from 'app/store/modules/product.store'
import { defineComponent } from 'vue'
import ProductItem from 'widgets/pages/products/ProductItem.vue'
import UiButton from 'widgets/ui/UiButton.vue'

export default defineComponent({
  name: 'ProductsPage',
  data: () => ({
    products: [] as ProductI[],
    addProductButtonLoading: false,
  }),
  components: { ProductItem, UiButton, },
  props: {},
  computed: {},
  methods: {
    async getProducts () {
      try {
        const data: any = await this.axios.get('product/get-many?sortColumn=id&sort=DESC')

        this.products = data.products
      } catch {}
    },
    async deleteProduct (product: ProductI) {
      const data: any = await this.axios.delete(`product/delete-product/${product.href}`)

      if (data.ok) {
        this.getProducts()
      }
    },
    addProduct () {
      this.addProductButtonLoading = true
      this.$router.push('/admin/products-create')
    },
  },
  mounted () {
    this.getProducts()
  },
})
</script>

<style lang="scss">
.products-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
