<template>
  <div class="create-article-page">
    <h1>Добавление новой статьи</h1>
    <article-form
      @update-data="createArticle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleFormVue from 'widgets/pages/articles/ArticleForm.vue'

const ArticleForm: any = ArticleFormVue

export default defineComponent({
  name: 'CreateArticlePage',
  data: () => ({}),
  components: { ArticleForm, },
  props: {},
  computed: {},
  methods: {
    async createArticle (article: any) {
      const data: any = await this.axios.post('articles/create', article)

      if (data.ok) {
        this.$router.push('/admin/articles')
      }
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.create-article-page {
  h1 {
    margin-bottom: 40px;
  }
}
</style>
