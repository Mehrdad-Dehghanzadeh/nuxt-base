<template>
  <button
    v-bind="$attrs"
    :class="[
      'btn',
      { 'direction-ltr': ltr },
      `${size ? 'btn--' + size : ''}`,
      `${color ? 'btn-' + color : ''}`,
      `${fontWeight ? 'btn--' + fontWeight : ''}`,
      `${display ? 'btn--' + display : ''}`,
    ]"
  >
    <i
      v-if="!append"
      v-show="icon"
      :class="['btn__icon', `${icon ? 'icon-' + icon : ''}`]"
    ></i>

    <span class="btn__text">
      <slot>{{ text }}</slot>
    </span>

    <i
      v-if="append"
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
      typeof: [String, Number],
      default: '',
    },

    size: {
      typeof: String,
      validator: (val) => ['xs', 'sm', 'lg', 'xl', 'wide'].includes(val),
      default: '',
    },

    color: {
      tyepof: String,
      default: 'primary',
    },

    fontWeight: {
      typeof: String,
      validator: (val) => ['', 'normal', 'bolder'].includes(val),
      default: '',
    },

    display: {
      typeof: String,
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

    ltr: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" src="./VBtn.scss" />
