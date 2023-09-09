<template>
  <div class="ui-textarea">
    <textarea
      :placeholder="placeholder"
      :value="modelValue"
      @change="onChange"
      @input="onChange"
      @keypress.enter="onEnter"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiTextarea',
  data: () => ({}),
  components: {},
  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  computed: {},
  methods: {
    onChange (event: any) {
      setTimeout(() => {
        this.$emit('update:modelValue', event.target.value)
      }, this.delay)
    },
    onEnter (event: any) {
      this.$emit('enter-press', event.target.value)
      this.$emit('update:modelValue', event.target.value)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-textarea {
  max-width: 500px;
  width: 100%;

  border-radius: 6px;
  border: 1px solid var(--primary-color);

  textarea {
    width: 100%;
    height: 100%;

    padding: 10px;

    resize: none;

    &::placeholder {
      color: var(--primary-color);
    }
  }
}
</style>
