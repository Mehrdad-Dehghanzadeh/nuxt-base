<template>
  <span
    v-if="show"
    :class="[
      'chip',
      {
        'chip--clearable': clearable,
        'chip--outline': outline,
        'chip--success': success,
        'chip--info': info,
        'chip--alert': alert,
        'chip--error': error,
      },
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
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    alert: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    onclear() {
      this.show = false
      this.$emit('removed')
    },
  },
}
</script>

<style src="./VChip.scss" lang="scss" />
