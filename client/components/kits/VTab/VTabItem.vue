<template>
  <section v-if="active" class="v-tab-item">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'VTabItem',

  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss" src="./VTab.scss" />
