<template>
  <div class="ui-upload-images">
    <div
      class="ui-upload-images__item"
      v-for="(item, index) in items"
      :key="item.id"
    >
      <img
        :src="item.image"
        v-if="item.image"
        alt=""
      >
      <img
        src="~/shared/assets/gifs/loader.gif"
        v-else
        alt=""
      >
      <img
        src="~/shared/assets/icons/delete.png"
        class="ui-upload-images__remove"
        alt=""
        @click="removeImage(item, index)"
      >
    </div>
    <div
      class="ui-upload-images__item pointer"
      @click="targetInput"
    >
      <span>+</span>
    </div>
    <input
      type="file"
      multiple
      id="uploadInput"
      @change="updload"
    >
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { UploadImages } from 'features/upload-images'
import { checkImage } from 'features/check-image'

interface UploadImageI {
  id: number
  image: string
}

export default defineComponent({
  name: 'UiUploadImages',
  data: () => ({
    items: [] as UploadImageI[],
  }),
  components: {},
  props: {
    images: Array as PropType<string[]>,
  },
  computed: {},
  methods: {
    async updload (event: any) {
      const images = await UploadImages(event.target.files)

      const newItems: UploadImageI[] = this.items || []

      for (let j = 0; j < images.length; j++) {
        const newItem: UploadImageI = {
          id: this.items.length + j + 1,
          image: await checkImage(images[j]),
        }

        newItems.push(newItem)
      }

      this.items = newItems
      this.$emit('upload-images',
        this.images && this.images.length ? [...this.images, ...images, ] : images
      )
    },
    targetInput () {
      const input = document.getElementById('uploadInput')
      input?.click()
    },
    async setImages () {
      if (!this.images || !this.images.length) return

      for (let i = 0; i < this.images.length; i++) {
        const image: UploadImageI = {
          id: i + 1,
          image: await checkImage(this.images[i]),
        }

        this.items.push(image)
      }
    },
    removeImage (item: UploadImageI, index: number) {
      this.items = this.items.filter((el) => el.id !== item.id)

      if (this.images) {
        const newImages = this.images.filter((el, ind) => {
          return ind !== index
        })
        this.$emit('upload-images', newImages)
        return
      }
      this.$emit('upload-images', this.images)
    },
  },
  mounted () {
    this.setImages()
  },
})
</script>

<style lang="scss">
.ui-upload-images {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin: 40px 0;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    width: 150px;
    height: 150px;

    border-radius: 6px;
    overflow: hidden;

    margin-right: 20px;
    margin-bottom: 20px;
    background: var(--secondary-alternative-background-color);

    img {
      width: 100%;

      &.ui-upload-images__remove {
        position: absolute;
        top: 10px;
        right: 10px;

        width: 20px;
        background: var(--primary-background-color);
        border-radius: 50%;

        pointer-events: all;
        cursor: pointer;
        z-index: 10;
      }
    }

    span {
      font-size: 30px;
      font-weight: 900;
    }
  }

  input {
    display: none;
  }
}
</style>
