<template>
  <div :class="['k-progress', `k-progress--${type}`]">
    <div class="k-progress__line">
      <template v-if="type === 'determinate'">
        <span class="k-progress__value" />
        <span class="k-progress__value" />
      </template>

      <template v-if="type === 'linear'">
        <span class="k-progress__value" :style="{ width: `${value}%` }" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KProgress',
  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    type: {
      type: String,
      default: 'linear',
      validate: (val) => ['determinate', 'linear'].includes(val)
    }
  }
}
</script>

<style src="./KProgress.scss" lang="scss" />
