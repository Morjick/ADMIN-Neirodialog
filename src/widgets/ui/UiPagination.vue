<template>
  <div class="ui-pagination">
    <div
      style="margin-right: 10px; cursor: pointer;"
      :class="{
        disabled: !pagination.prevPageAvaible
      }"
      @click.stop="prevPage"
    >
      <img
        src="~/shared/assets/icons/arrow-left.png"
        alt=""
      >
    </div>
    <div
      class="ui-pagination__item"
      v-for="page in paginationList"
      :key="page.value"
      :class="{
        active:
          (!$route.query.page && page.value === '1')
          || String($route.query.page) === String(page.value),
        disabled: page.isDisabled
      }"
      @click="setPage(page)"
    >{{ page.value }}</div>
    <div
      style="cursor: pointer;"
      :class="{
        disabled: !pagination.nextPageAvaible
      }"
      @click.stop="nextPage"
    >
      <img
        src="~/shared/assets/icons/arrow-right.png"
        alt=""
      >
    </div>
  </div>
</template>

<script lang="ts">
import { type PaginationI, type PaginatioPageI } from 'app/contracts/pagination'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'UiPagination',
  data: () => ({
    paginationList: [] as PaginatioPageI[],
  }),
  components: {},
  props: {
    pagination: {
      type: Object as PropType<PaginationI>,
      required: true,
    },
    query: {
      type: Object,
    },
  },
  computed: {
    page () {
      return this.$route.query.page || 1
    },
  },
  methods: {
    getPaginationPageCount () {
      const paginationList = []
      const pagesLength = this.pagination.pages > 5 ? 3 : this.pagination.pages
      const otherPageLength = pagesLength >= 3 ? 6 : 6

      if (this.pagination.activePage > 5) {
        paginationList.push({
          value: '1',
          isDisabled: false,
          isActive: false,
        })
        paginationList.push({
          value: '...',
          isDisabled: true,
          isActive: false,
        })

        for (let i = 0; i < 3; i++) {
          const pageValue = this.pagination.activePage + i
          paginationList.push({
            value: String(pageValue),
            isDisabled: pageValue > this.pagination.pages,
            isActive: false,
          })
        }

        this.paginationList = paginationList
        return
      }

      for (let i = 1; i <= pagesLength; i++) {
        paginationList.push({
          value: String(i),
          isActive:
            (!this.$route.query.page && i === 1) || String(this.$route.query.page) === String(i),
          isDisabled: false,
        })
      }

      if (pagesLength < 5) {
        for (let i = pagesLength + 1; i <= otherPageLength - pagesLength; i++) {
          paginationList.push({
            value: String(i),
            isActive:
              (!this.$route.query.page && i === 1) || String(this.$route.query.page) === String(i),
            isDisabled: true,
          })
        }
      }

      if (this.pagination.pages > 5) {
        paginationList.push({
          value: '...',
          isDisabled: true,
          isActive: false,
        })
      }

      if (pagesLength >= 3) {
        paginationList.push({
          value: this.pagination.pages > 5 ? String(this.pagination.pages) : '5',
          isActive: false,
          isDisabled: this.pagination.pages < 5,
        })
      }

      this.paginationList = paginationList
    },
    setPage (page: PaginatioPageI) {
      this.$router.replace({
        query: {
          ...this.query,
          page: page.value,
        },
      })
    },
    nextPage () {
      this.$router.replace({
        query: {
          ...this.query,
          page: Number(this.$route.query.page) + 1,
        },
      })
    },
    prevPage () {
      this.$router.replace({
        query: {
          ...this.query,
          page: Number(this.$route.query.page) - 1,
        },
      })
    },
  },
  watch: {
    page () {
      setTimeout(() => this.$emit('update-pagination'), 500)
    },
    pagination () {
      this.getPaginationPageCount()
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 20px auto;

  .disabled {
    pointer-events: none;
    opacity: .5;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 50px;
    height: 50px;

    background-color: var(--secondary-alternative-background-color);
    box-shadow: 0 0 5px 0  var(--secondary-alternative-background-color);
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;

    &.active {
      box-shadow: 0 0 5px 0  var(--primary-color);
    }

    &.disabled {
      opacity: .5;
      pointer-events: none;
    }
  }
}
</style>
