<template>
  <button
    :class="[
      'btn',
      { 'direction-ltr': ltr },
      { 'btn-outline': outline },
      { 'btn--disable': disabled },
      `${size ? 'btn--' + size : ''}`,
      `${color ? 'btn-' + color : ''}`,
      `${fontWeight ? 'btn--' + fontWeight : ''}`,
      `${display ? 'btn--' + display : ''}`,
    ]"
    v-bind="$attrs"
    :disabled="disabled"
  >
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
      validator: (val) => ['xs', 'sm', 'lg', 'xl', 'wide'].includes(val),
      default: '',
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
      typeof: Boolean,
      default: false,
    },

    disabled: {
      typeof: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" src="./VBtn.scss" />
