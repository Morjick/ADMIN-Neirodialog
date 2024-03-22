<template>
  <div class="articles-page">
    <div class="articles-page__title">
      <h1>Статьи</h1>
      <ui-button
        text="Добавить"
        @send="pushToCreate"
      />
    </div>
    <div class="articles-page__list">
      <div
        class="articles-page__item"
        v-for="item in articles"
        :key="item.id"
      >
        <span class="id">{{ item.id }}</span>
        <p class="title">{{ item.title }}</p>
        <div class="buttons">
          <ui-button
            text="Редактировать"
            mode="outlined"
            size="size-s"
            @send="updateArticle(item)"
          />
          <ui-button
            text="Удалить"
            mode="danger"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArticleI } from 'app/store/modules/articles.store'
import { defineComponent } from 'vue'
import UiButton from 'widgets/ui/UiButton.vue'

export default defineComponent({
  name: 'ArticlesPage',
  data: () => ({
    pageIsLoad: false,
    articles: [] as ArticleI[],
  }),
  components: { UiButton, },
  props: {},
  computed: {},
  methods: {
    async getArticles () {
      const data: any = await this.axios.get('articles/get-many')

      this.articles = data.articles
      this.pageIsLoad = true
    },
    pushToCreate () {
      this.$router.push('/admin/articles/create')
    },
    updateArticle (item: ArticleI) {
      this.$router.push(`/admin/articles/update/${item.href}`)
    },
  },
  mounted () {
    this.getArticles()
  },
})
</script>

<style lang="scss">
.articles-page {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px dashed var(--primary-color);
    padding-bottom: 15px;
    margin-bottom: 15px;

    &:last-child {
      border-bottom: none;
    }

    .id {
      width: 50px;
    }

    .title {
      width: 80%;
    }

    .buttons {
      display: flex;
      align-items: center;

      .ui-button {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
