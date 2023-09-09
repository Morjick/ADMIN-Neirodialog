<template>
  <div class="article-form">
    <div style="display: flex;">
      <ui-avatar
        @upload-avatar="uploadAvatar"
      />
      <p
        style="margin-top: 50px; font-weight: bold; margin-right: 20px;"
      >Добавить автар для статьи</p>
    </div>
    <ui-input
      v-model="title"
      placeholder="Придумайте заголовок"
    />

    <ui-textarea
      v-model="description"
      placeholder="Введите описание статьи (50-200 символов)"
    />

    <ui-editor
      v-model="body"
    />

    <ui-tags
      @update-tags="updateTags"
      :actual-tags="tags"
    />

    <p class="bold">Добавить изображения для статьи</p>
    <ui-upload-images
      @upload-images="uploadImages"
    />

    <ui-checkbox
      v-model="show"
    >Опубликовать статью после сохранения</ui-checkbox>

    <div class="article-form__buttons">
      <ui-button
        text="Отменить"
        mode="outlined"
        @send="cancel"
      />
      <ui-button
        text="Сохранить"
        @send="saveData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import UiButton from 'widgets/ui/UiButton.vue'
import UiCheckbox from 'widgets/ui/UiCheckbox.vue'
import UiEditor from 'widgets/ui/UiEditor.vue'
import UiInput from 'widgets/ui/UiInput.vue'
import UiTextarea from 'widgets/ui/UiTextarea.vue'
import UiUploadImagesVue from 'widgets/ui/UiUploadImages.vue'
import UiAvatarVue from 'widgets/ui/UiUploadAvatar.vue'
import UiTagsVue from 'widgets/ui/UiTags.vue'
import { ArticleI } from 'app/store/modules/articles.store'

const UiUploadImages: any = UiUploadImagesVue
const UiAvatar: any = UiAvatarVue
const UiTags: any = UiTagsVue

export default defineComponent({
  name: 'ArticleForm',
  data: () => ({
    avatar: '',
    title: '',
    description: '',
    tags: [] as string[],
    body: '',
    show: true,
    images: [] as string[],
  }),
  components: {
    UiButton,
    UiInput,
    UiTextarea,
    UiEditor,
    UiCheckbox,
    UiUploadImages,
    UiAvatar,
    UiTags,
  },
  props: {
    updateArticles: {
      type: Object as PropType<ArticleI>,
    },
  },
  computed: {},
  methods: {
    uploadImages (images: string[]) {
      this.images = images
    },
    uploadAvatar (avatar: string) {
      this.avatar = avatar
    },
    updateTags (tags: string[]) {
      this.tags = tags
    },
    saveData () {
      const article = {
        title: this.title,
        description: this.description,
        avatar: this.avatar,
        body: this.body,
        tags: this.tags,
        show: this.show,
        images: this.images,
      }

      this.$emit('update-data', article)
    },
    cancel () {
      this.$router.push('/articles')
    },
  },
  mounted () {
    setTimeout(() => {
      if (this.updateArticles && this.updateArticles.id) {
        this.title = this.updateArticles.title
        this.description = this.updateArticles.description
        this.tags = this.updateArticles.tags
        this.avatar = this.updateArticles.avatar
        this.body = this.updateArticles.body
        this.show = this.updateArticles.show
        this.images = this.updateArticles.images
      }
    }, 100)
  },
})
</script>

<style lang="scss">
.article-form {

  .ui-input, .ui-textarea, .ui-tags {
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    margin-top: 40px;

    .ui-button {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
