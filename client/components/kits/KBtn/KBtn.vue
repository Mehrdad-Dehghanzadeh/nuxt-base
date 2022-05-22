<template>
  <button
    :class="[
      'k-btn',
      { 'direction-ltr': ltr },
      { 'k-btn-outline': outline },
      { 'k-btn--disable': disabled },
      `${size !== 'md' ? 'k-btn--' + size : ''}`,
      `${color ? 'k-btn-' + color : ''}`,
      `${fontWeight ? 'k-btn--' + fontWeight : ''}`,
      `${display ? 'k-btn--' + display : ''}`,
    ]"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled"
  >
    <template v-if="loading">
      <span :class="['loading', { 'loading--lg': loadingLgClass }]"> </span>
    </template>

    <template v-else>
      <i
        v-if="!append"
        v-show="icon"
        :class="['k-btn__icon', `${icon ? 'icon-' + icon : ''}`]"
      ></i>

      <span class="k-btn__text">
        <slot>{{ text }}</slot>
      </span>

      <i
        v-if="append"
        v-show="icon"
        :class="['k-btn__icon', `${icon ? 'icon-' + icon : ''}`]"
      ></i>
    </template>
  </button>
</template>

<script>
export default {
  name: 'KBtn',

  props: {
    text: {
      type: [String, Number],
      default: '',
    },

    size: {
      type: String,
      validator: (val) => ['xs', 'sm', 'md', 'lg', 'xl', 'wide'].includes(val),
      default: 'md',
    },

    color: {
      type: String,
      default: 'primary',
    },

    fontWeight: {
      type: String,
      validator: (val) => ['', 'normal', 'bolder'].includes(val),
      default: '',
    },

    display: {
      type: String,
      validate: (val) => ['flex', 'block'].includes(val),
      default: '',
    },

    icon: {
      type: String,
      default: '',
    },

    append: {
      type: Boolean,
      default: false,
    },

    outline: {
      type: Boolean,
      default: false,
    },

    ltr: {
      type: Boolean,
      default: false,
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
    loadingLgClass() {
      return this.size == 'lg' && this.size == 'xl' && this.size == 'wide'
    },
  },
}
</script>

<style lang="scss" src="./KBtn.scss" />
