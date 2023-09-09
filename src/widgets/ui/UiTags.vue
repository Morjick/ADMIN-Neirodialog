<template>
  <div class="ui-tags">
    <ui-input
      v-model="newTag"
      placeholder="Введите тег и нажмите Enter для его добавления"
      id="tagInput"
      @enter-press="addTag"
    />

    <div class="ui-tags__list">
      <span
        v-for="tag in tags"
        :key="tag"
        @click="filterTags(tag)"
      >{{ tag }} &#9746;</span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import UiInput from './UiInput.vue'

export default defineComponent({
  name: 'UiTags',
  data: () => ({
    tags: [] as string[],
    newTag: '',
  }),
  components: { UiInput, },
  props: {
    actualTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  computed: {},
  methods: {
    addTag () {
      this.tags = [...this.tags, this.newTag, ]

      this.newTag = ''

      this.$emit('update-tags', this.tags)
    },
    filterTags (tag: string) {
      this.tags = this.tags.filter((el: string) => el !== tag)

      this.$emit('update-tags', this.tags)
    },
    setTags () {
      if (this.actualTags) {
        this.tags = this.actualTags.map(el => el)
      }
    },
  },
  mounted () {
    setTimeout(() => this.setTags(), 300)
  },
})
</script>

<style lang="scss">
.ui-tags {
  &__list {
    display: flex;
    flex-wrap: wrap;

    margin-top: 10px;

    span {
      padding: 5px;
      margin-right: 10px;
      border-radius: 3px;
      background: var(--primary-alternative-color);
    }
  }
}
</style>
