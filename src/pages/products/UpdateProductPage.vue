<template>
  <div class="update-product-page">
    <div class="update-product-page__header">
      <h1>Изменить продукт</h1>
      <ui-button
        text="Отменить"
        mode="danger"
        @send="cancel"
      />
    </div>
    <div
      class="update-product-page__body"
      v-if="product"
    >
      <div class="edit-product-page__form">
        <ui-input
          v-model="product.title"
          placeholder="Введите название продукта"
          mode="outlined"
        />
        <ui-inputNumber
          v-model="product.price"
          placeholder="Введите цену продукта"
          input-type="number"
          mode="outlined"
        />
        <ui-input
          v-model="product.discount"
          placeholder="Введите скидку на продукт (если есть)"
          input-type="number"
          mode="outlined"
        />
      </div>
      <p class="edit-product-page__subtitle">Опишите продукт</p>
      <ui-editor
        v-model="product.description"
      />

      <ui-upload-images
        :images="product.images"
        @upload-images="setImages"
      />

      <ui-checkbox v-model="product.show">Опубликовать продукт сразу после создания</ui-checkbox>

      <div class="update-product-page__buttons">
        <ui-button
          text="Сохранить"
          :loading="isButtonSaveLoading"
          @send="saveProduct"
        />
      </div>
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script lang="ts">
import { ProductI } from 'app/store/modules/product.store'
import { defineComponent } from 'vue'
import UiButton from 'widgets/ui/UiButton.vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiEditor from 'widgets/ui/UiEditor.vue'
import UiUploadImagesVue from 'widgets/ui/UiUploadImages.vue'
import UiCheckbox from 'widgets/ui/UiCheckbox.vue'

const UiUploadImages: any = UiUploadImagesVue

export default defineComponent({
  name: 'UpdateProductPage',
  data: () => ({
    product: null as ProductI | null,
    isButtonSaveLoading: false,
    images: [] as string[],
    description: '',
  }),
  components: { UiButton, UiInput, UiEditor, UiCheckbox, UiUploadImages, },
  props: {},
  computed: {},
  methods: {
    cancel () {
      this.$router.push({ name: 'ProductsPage', })
    },
    async saveProduct () {
      const href = this.$route.params.href

      if (!href) {
        this.$router.push({ name: 'ProductPage', })
        throw new Error('Ошибка при получении продукта')
      }

      const data: any = await this.axios.post('product/update-product', {
        ...this.product,
        images: this.images,
      })

      if (data.ok) {
        this.$router.push({ name: 'ProductsPage', })
      }
    },
    setImages (images: string[]) {
      this.images = images
    },
    async getProduct () {
      const href = this.$route.params.href

      if (!href) {
        this.$router.push({ name: 'ProductPage', })
        throw new Error('Ошибка при получении продукта')
      }

      const data: any = await this.axios.get(`product/get-one/${href}`)
      const product: ProductI = JSON.parse(JSON.stringify(data.product))
      const description: string = JSON.parse(JSON.stringify(data.product.description))
      product.description = description

      this.product = { ...product, }
    },
  },
  mounted () {
    this.getProduct()
  },
})
</script>

<style lang="scss">
.update-product-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 50px;
  }

  &__body {
    .ui-input {
      margin-bottom: 40px;
    }
  }

  &__buttons {
    margin-top: 20px;
  }
}
</style>
