<template>
  <section
    v-show="active"
    class="v-stepper-step"
    :style="{ flex: `0 0 ${width}%` }"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'VStepperStep',
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      width: 100,
      active: false
    }
  }
}
</script>

<style lang="scss" src="./VStepper.scss" />
