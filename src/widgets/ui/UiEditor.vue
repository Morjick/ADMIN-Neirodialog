<template>
  <div class="ui-editor">
    <ckeditor
      ref="editor"
      :value="modelValue"
      :editor="editor"
      :config="editorConfig"
      :disabled="disabled"
      v-model="editorData"
      @input="onChange"
    ></ckeditor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default defineComponent({
  name: 'UiEditor',
  data: () => ({
    editor: ClassicEditor,
    editorData: '' as string,
    editorConfig: {
      // The configuration of the editor.
    },
  }),
  components: {},
  props: {
    modelValue: {
      type: String,
    },
    delay: {
      type: Number,
      default: 300,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    onChange (value: string) {
      if (!value || value === '') return
      setTimeout(() => {
        this.$emit('update:modelValue', value)
      }, this.delay)
    },
  },
  mounted () {
    if (this.modelValue) {
      this.editorData = this.modelValue
    }
  },
  watch: {
    modelValue () {
      if (!this.modelValue) return
      this.editorData = this.modelValue as string
    },
  },
})
</script>

<style lang="scss">
.ui-editor {
  margin: 40px 0;

  .ck-content {
    min-height: 500px;
    height: 100%;
  }
}
</style>
