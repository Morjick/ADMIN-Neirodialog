<template>
  <div
    class="ui-input"
    :class="[{
      valid: valid,
      invalid: !valid,
    }, mode]"
  >
    <input
      :type="inputType"
      :value="modelValue"
      @change="onChange"
      @input="onInput"
      @keypress.enter="onEnter"
      required
    >
    <span v-if="placeholder?.length">{{ placeholder }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiInput',
  data: () => ({}),
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Number, ],
    },
    valid: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      default: 'primary',
    },
  },
  computed: {},
  methods: {
    onChange (event: any) {
      setTimeout(() => {
        this.$emit('update:modelValue', event.target.value)
      }, this.delay)
    },
    onInput (event: any) {
      setTimeout(() => {
        this.$emit('update:modelValue', event.target.value)
      }, this.delay)
    },
    onEnter (event: any) {
      this.$emit('enter-press')
      this.$emit('update:modelValue', event.target.value)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-input {
  position: relative;

  max-width: 500px;

  transition: all .2s;

  span {
    position: absolute;
    top: 0;

    transition: all .2s;
    pointer-events: none;
  }

  input {
    display: block;
    width: 100%;
    height: 100%;

    &:valid, &:active, &:focus {
      & ~ span {
        top: -50%;
      }
    }
  }

  &.primary {
    border-bottom: 1px solid var(--primary-color);

    span {
      color: var(--primary-alternative-color);
    }
  }

  &.outlined {
    border-bottom: 1px solid var(--primary-background-alternative-color);
  }

  &.invalid {
    border-bottom: 1px solid var(--danger-color);
    color: var(--danger-color);

    span {
      color: var(--danger-color);
    }

    &::placeholder {
      color: var(--danger-color);
    }
  }
}
</style>
