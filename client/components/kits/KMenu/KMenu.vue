<template>
  <span v-click-outside="onClose" class="k-menu">
    <slot v-bind="{ on: { click: onOpen } }" name="handler">
      <span
        @click="onOpen"
        :class="['k-menu__handler', handlerClass]"
      >
        <i class="icon-more-horizontal"></i>
      </span>
    </slot>
    <transition name="menu">
      <div
        ref="menu"
        v-show="show"
        :class="['k-menu__wrapper', { 'k-menu__wrapper--light': light }]"
      >
        <ul class="k-menu__list">
          <slot />
        </ul>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'KMenu',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    handlerClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.$root.$el.prepend(this.$refs.menu)
  },
  beforeDestroy() {
    if (this.$refs.menu.parentNode)
      this.$refs.menu.parentNode.removeChild(this.$refs.menu)
  },
  methods: {
    onClose() {
      this.show = false
    },

    onOpen(e) {
      if (!this.handler) this.handler = e.currentTarget

      if (!this.show) {
        this.setPosition()
        this.show = true
      } else {
        this.onClose()
      }
    },
    setPosition() {
      const scrollTop = window.scrollY
      const screenWidth = window.innerWidth - 35
      const menu = this.$refs.menu
      const handlerPosition = this.handler.getBoundingClientRect()
      const maxLeftPosition = handlerPosition.left + 150

      menu.style.left =
        maxLeftPosition < screenWidth
          ? handlerPosition.left + 'px'
          : handlerPosition.left - (maxLeftPosition - screenWidth) + 'px'

      menu.style.top =
        handlerPosition.top + handlerPosition.height + scrollTop - 5 + 'px'
    },
  },
}
</script>

<style src="./KMenu.scss" lang="scss" />
