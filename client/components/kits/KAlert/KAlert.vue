<template>
  <section
    :class="['k-alert', { 'k-alert--open': isVisible }]"
    v-show="isVisible"
    ref="alert"
  >
    <client-only>
      <div class="k-alert__container">
        <div class="k-alert__icon">
          <i
            :class="`icon ${
              success ? 'icon-check-circle' : 'icon-help-circle'
            }`"
          />
        </div>

        <div v-if="title" class="k-alert__title">
          <slot name="title">
            <h4 class="heading-3">{{ title }}</h4>
          </slot>
        </div>

        <div class="k-alert__content subtitle-2">
          <slot>
            <p v-if="text">{{ text }}</p>
          </slot>
        </div>

        <div class="mt-20">
          <template v-if="success">
            <k-btn
              color="info"
              size="xs"
              icon="check-square"
              @click="confirmHandler"
              :loading="loading"
            >
              {{ successBtnText }}
            </k-btn>
          </template>

          <template v-else>
            <k-btn color="red" size="xs" icon="x" @click="close" outline>
              {{ cancelBtnTitle }}
            </k-btn>
            <k-btn
              color="success"
              size="xs"
              icon="check"
              @click="confirmHandler"
              :loading="loading"
            >
              {{ confirmBtnText }}
            </k-btn>
          </template>
        </div>
      </div>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'KAlert',

  props: {
    success: Boolean,
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    handler: {
      type: Function,
      default() {}
    },
    confirmBtnText: {
      type: String,
      default: 'تایید'
    },
    cancelBtnTitle: {
      type: String,
      default: 'لغو'
    },
    successBtnText: {
      type: String,
      default: 'قبول'
    }
  },

  data() {
    return {
      isVisible: false,
      loading: false
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

  created() {
    // modal can open with custom event
    this.$nuxt.$on('closeAlert', () => {
      this.close()
    })

    // modal can close with custom event
    this.$nuxt.$on('openAlert', () => {
      this.open()
    })
  },

  mounted() {
    document.getElementById('__nuxt').append(this.$refs.alert)
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
    },

    async confirmHandler() {
      this.loading = true
      await this.handler()
      this.$emit('confirm')
      this.close()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" src="./KAlert.scss" />
