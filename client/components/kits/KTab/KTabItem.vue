<template>
  <transition :name="transition">
    <section v-if="active" class="k-tab-item">
      <slot />
    </section>
  </transition>
</template>

<script>
export default {
  name: 'KTabItem',

  data() {
    return {
      active: false,
      transition: 'fade'
    }
  }
}
</script>

<style lang="scss" src="./KTab.scss" />
