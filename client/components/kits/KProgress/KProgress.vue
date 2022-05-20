<template>
  <div :class="['k-progress', { 'k-progress--determinate': determinate }]">
    <div v-if="determinate" class="k-progress__line">
      <span class="k-progress__value" />
      <span class="k-progress__value" />
    </div>

    <div v-else class="k-progress__line">
      <span class="k-progress__value" :style="{ width: `${value}%` }" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KProgress',

  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    determinate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style src="./KProgress.scss" lang="scss" />
