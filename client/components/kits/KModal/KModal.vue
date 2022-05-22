<template>
  <transition name="fade">
    <section
      ref="modal"
      v-show="isVisible"
      :class="['k-modal', { 'k-modal--open': isVisible }]"
      @click.self="close"
    >
      <div :class="['k-modal__container', `k-modal__container--${size}`]">
        <div v-if="title" class="k-modal__header">
          <slot name="header">
            <h3 class="k-modal__title" v-text="title" />
          </slot>
        </div>

        <div class="k-modal__content">
          <slot />
        </div>

        <div v-if="hasFooter" class="k-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'KModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      validator: (val) =>
        ['xs', 'sm', 'md', 'lg', 'xl', 'full', 'auto'].includes(val),
      default: 'md'
    }
  },

  data() {
    return {
      isVisible: false
    }
  },

  computed: {
    hasFooter() {
      return !!this.$slots.footer
    }
  },

  watch: {
    value: {
      handler(newVal) {
        if (!process.server) {
          newVal ? this.open() : this.close()
        }
      },
      immediate: true
    }
  },

  methods: {
    open() {
      this.isVisible = true
      document.body.classList.add('overflow-hidden')
    },

    close() {
      this.isVisible = false
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
      }, 300)

      this.$nextTick(() => {
        this.$emit('input', false)
      })
    }
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
  }
}
</script>

<style lang="scss" src="./KModal.scss" />
