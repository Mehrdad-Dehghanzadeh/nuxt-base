<template>
  <transition :name="transition">
    <section v-if="active" class="v-tab-item">
      <slot />
    </section>
  </transition>
</template>

<script>
export default {
  name: 'VTabItem',

  data() {
    return {
      active: false,
      transition: 'fade'
    }
  }
}
</script>

<style lang="scss" src="./VTab.scss" />
