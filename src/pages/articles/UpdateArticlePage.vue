<template>
  <div class="update-article-page">
    <article-form
      :update-articles="article"
    />
  </div>
</template>

<script lang="ts">
import { ArticleI } from 'app/store/modules/articles.store'
import { defineComponent } from 'vue'
import ArticleFormVue from 'widgets/pages/articles/ArticleForm.vue'

const ArticleForm: any = ArticleFormVue

export default defineComponent({
  name: 'UpdateArticlePage',
  data: () => ({
    article: null as ArticleI | null,
  }),
  components: { ArticleForm, },
  props: {},
  computed: {},
  methods: {
    async getArticle () {
      const data: any = await this.axios.get(`/articles/get-article/${this.$route.params.href}`)

      if (data.ok) {
        this.article = data.article
      }
    },
  },
  mounted () {
    this.getArticle()
  },
})
</script>

<style lang="scss">
// .update-article-page {}
</style>
