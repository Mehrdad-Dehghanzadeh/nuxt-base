<template>
  <transition name="fade">
    <section
      ref="modal"
      v-show="isVisible"
      :class="['modal', { 'modal--open': isVisible }]"
      @click.self="close"
    >
      <div :class="['modal__container', `modal__container--${size}`]">
        <div class="modal__header">
          <slot name="header">
            <h3 class="modal__title" v-text="title" />
          </slot>
        </div>

        <div class="modal__content">
          <slot />
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'VModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      validator: (val) =>
        ['xs', 'sm', 'md', 'lg', 'xl', 'full', 'auto'].includes(val),
      default: 'md',
    },
  },

  data() {
    return {
      isVisible: false,
    }
  },

  watch: {
    value: {
      handler(newVal) {
        if (!process.server) {
          newVal ? this.open() : this.close()
        }
      },
      immediate: true,
    },
  },

  methods: {
    open() {
      this.isVisible = true
      document.body.classList.add('modal-is-open')
    },

    close() {
      this.isVisible = false
      setTimeout(() => {
        document.body.classList.remove('modal-is-open')
      }, 300)

      this.$nextTick(() => {
        this.$emit('input', false)
      })
    },
  },

  created() {
    // modal can open with custom event
    this.$nuxt.$on('closeModal', () => {
      this.close()
    })

    // modal can close with custom event
    this.$nuxt.$on('openModal', () => {
      this.open()
    })
  },

  mounted() {
    document.getElementById('__nuxt').append(this.$refs.modal)
  },
}
</script>

<style lang="scss" src="./VModal.scss" />
