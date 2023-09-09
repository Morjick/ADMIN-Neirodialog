<template>
  <div
    class="ui-checkbox"
    @click="check"
  >
    <div
      class="ui-checkbox__item"
      :class="{
        checked: modelValue
      }"
    >
      <span></span>
    </div>
    <div class="ui-checkbox__prop">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiCheckbox',
  data: () => ({}),
  components: {},
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  computed: {},
  methods: {
    check () {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
$radius: 10px;

.ui-checkbox {
  display: flex;
  align-items: center;

  cursor: pointer;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    padding: 10px;
    margin-right: 20px;
    border-radius: $radius;
    background: var(--secondary-background-color);
    border: 1px solid var(--primary-color);
    overflow: hidden;

    span {
      display: block;

      width: 100%;
      height: 100%;

      background: var(--primary-color);
      border-radius: $radius / 4;
      transition: all .2s;
      opacity: 0;
    }

    &.checked {
      span {
        opacity: 1;
      }
    }
  }
}
</style>
