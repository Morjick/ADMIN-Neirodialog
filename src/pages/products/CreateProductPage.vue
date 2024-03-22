<template>
  <div class="edit-product-page">
    <h1>Создание продукта</h1>
    <div class="edit-product-page__form">
      <ui-input
        v-model="name"
        placeholder="Введите название продукта"
        mode="outlined"
      />
      <ui-input
        v-model="price"
        placeholder="Введите цену продукта"
        input-type="number"
        mode="outlined"
      />
      <ui-input
        v-model="discount"
        placeholder="Введите скидку на продукт (если есть)"
        input-type="number"
        mode="outlined"
      />
    </div>
    <p class="edit-product-page__subtitle">Опишите продукт</p>
    <ui-editor
      v-model="description"
    />

    <ui-upload-images
      @upload-images="setImages"
    />

    <ui-checkbox v-model="show">Опубликовать продукт сразу после создания</ui-checkbox>

    <div class="edit-product-page__buttons">
      <ui-button
        text="Сохранить"
        :loading="isButtonCreateLoading"
        @send="createProduct"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from 'widgets/ui/UiButton.vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiEditor from 'widgets/ui/UiEditor.vue'
import UiUploadImagesVue from 'widgets/ui/UiUploadImages.vue'
import UiCheckbox from 'widgets/ui/UiCheckbox.vue'

const UiUploadImages: any = UiUploadImagesVue

export default defineComponent({
  name: 'EditProductPage',
  data: () => ({
    description: '',
    name: '',
    price: '',
    discount: '',
    images: [] as string[],
    show: true,
    isButtonCreateLoading: false,
  }),
  components: { UiEditor, UiButton, UiInput, UiUploadImages, UiCheckbox, },
  props: {},
  computed: {},
  methods: {
    setImages (images: string[]) {
      this.images = images
    },
    async createProduct () {
      this.isButtonCreateLoading = true
      try {
        const data: any = await this.axios.post('/product/create-product', {
          title: this.name,
          basePrice: Number(this.price),
          discount: Number(this.discount) || 0,
          description: this.description,
          images: this.images,
          show: this.show,
        })

        if (data.ok) {
          this.$router.push('/admin/products')
        }
      } catch {}
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.edit-product-page {
  h1 {
    margin-bottom: 40px;
  }

  &__form {
    .ui-input {
      margin-bottom: 40px;
    }
  }

  &__subtitle {
    font-weight: 800;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
