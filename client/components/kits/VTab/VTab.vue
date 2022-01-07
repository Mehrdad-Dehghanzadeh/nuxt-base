<template>
  <section class="v-tab">
    <div class="v-tab-bar">
      
    </div>

    <div class="v-tab__contrainer">
      <slot  />
    </div>
  </section>
</template>

<script>
export default {
  name: "VTab",

  props: {
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#2f2faf'
    },
    tabs: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  watch: {
    value() {

    }
  }
}
</script>

<style lang="scss" src="./VTab.scss" />
