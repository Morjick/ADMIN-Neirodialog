<template>
  <div class="ui-upload-images ui-upload-avatar">
    <div
      class="ui-upload-images__item pointer"
      v-if="!avatar"
      @click="targetInput"
    >
      <span>+</span>
    </div>
    <img
      :src="avatar"
      class="avatar-image"
      alt=""
    >
    <input
      type="file"
      id="uploadAvatarInput"
      @change="updload"
    >
  </div>
</template>

<script lang="ts">
import { checkImage } from 'features/check-image'
import { UploadImages } from 'features/upload-images'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiUploadAvatar',
  data: () => ({
    avatar: '',
  }),
  components: {},
  props: {
    defaultAvatar: {
      type: String,
      default: '',
    },
  },
  computed: {},
  methods: {
    targetInput () {
      const input = document.getElementById('uploadAvatarInput')
      input?.click()
    },
    async updload (event: any) {
      const images = await UploadImages(event.target.files)

      this.avatar = await checkImage(images[0])

      this.$emit('upload-avatar', images[0])
    },
  },
  mounted () {
    this.avatar = this.defaultAvatar
  },
})
</script>

<style lang="scss">
.ui-upload-avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 150px;
  width: 150px;

  border-radius: 6px;
  overflow: hidden;

  .avatar-image {
    width: 150px;
  }
}
</style>
