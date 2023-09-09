<template>
  <button
    class="ui-button"
    :class="getClasses"
    :disabled="disabled || loading"
    @click.stop.prevent="handleButtonClick"
  >
    <span v-if="!loading">{{ text }}</span>
    <span v-else>Подождите...</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiButton',
  data: () => ({}),
  components: {},
  props: {
    mode: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'size-m',
    },
    text: {
      type: String,
      default: 'Отправить',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getClasses () {
      return `${this.mode} ${this.size}`
    },
  },
  methods: {
    handleButtonClick () {
      if (this.disabled) return false
      this.$emit('send')
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-button {
  position: relative;
  font-size: 18px;

  &.size-m {
    padding: 12px 50px;
    border-radius: 10px;
  }

  &.size-s {
    padding: 6px 15px;
    border-radius: 10px;
  }

  &.primary {
    background-color: var(--primary-color);
    color: var(--font-alternative-color);
    height: 50px;

    span {
      color: var(--font-alternative-color);
    }
  }

  &.outlined {
    background-color: var(--primary-background-color);
    border-radius: 6px;
    border: 1px solid var(--primary-color);

    span {
      color: var(--primary-color);
    }
  }

  &.danger {
    min-width: auto;
    font-weight: 800;
    font-size: 20px;
    padding: 0;
    color: var(--danger-color);

    span {
      color: var(--danger-color);
    }
  }

  &__loading {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  img {
    height: 100%;
  }

  span {
    font-size: inherit;
  }

  &:disabled,
  &[disabled] {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
