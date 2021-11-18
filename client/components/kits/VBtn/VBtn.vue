<template>
  <button
    :class="[
      'btn',
      { 'direction-ltr': ltr },
      { 'btn-outline': outline },
      { 'btn--disable': disabled },
      `${size != 'md' ? 'btn--' + size : ''}`,
      `${color ? 'btn-' + color : ''}`,
      `${fontWeight ? 'btn--' + fontWeight : ''}`,
      `${display ? 'btn--' + display : ''}`,
    ]"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <template v-if="loading">
      <span :class="['loading', { 'loading--lg': loadingLgClass }]"> </span>
    </template>

    <template v-else>
      <i
        v-if="append"
        v-show="icon"
        :class="['btn__icon', `${icon ? 'icon-' + icon : ''}`]"
      ></i>

      <span class="btn__text">
        <slot>{{ text }}</slot>
      </span>

      <i
        v-if="!append"
        v-show="icon"
        :class="['btn__icon', `${icon ? 'icon-' + icon : ''}`]"
      ></i>
    </template>
  </button>
</template>

<script>
export default {
  name: 'VBtn',

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

<style lang="scss" src="./VBtn.scss" />
