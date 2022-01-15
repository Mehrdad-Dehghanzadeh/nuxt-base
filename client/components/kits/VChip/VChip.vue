<template>
  <span
    v-if="show"
    :class="[
      'chip',

      {
        'chip--clearable': clearable,
        'chip--outline': outline
      },

      `${color ? `chip--${color}` : ''}`
    ]"
  >
    <slot />

    <span v-if="clearable" @click="onclear" class="chip__clear">
      <i class="icon-x"></i>
    </span>
  </span>
</template>
<script>
export default {
  name: 'VChip',
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '',
      validator: (val) =>
        ['success', 'alert', 'info', 'error', ''].includes(val)
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    onclear() {
      this.show = false
      this.$emit('removed')
    }
  }
}
</script>

<style src="./VChip.scss" lang="scss" />
