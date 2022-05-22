<template>
  <validation-observer :ref="safeName" slim>
    <form
      ref="form"
      @submit.prevent="submit"
      :class="[
        'k-form',
        { 'k-form--dense': dense, 'k-form--horizontal-md': horizontalMd }
      ]"
      autocomplete="on"
      v-bind="$attrs"
    >
      <slot />
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import controlMixin from '@mixins/control'

export default {
  name: 'KForm',
  components: { ValidationObserver },
  mixins: [controlMixin],

  props: {
    dense: {
      type: Boolean,
      default: false
    },
    horizontalMd: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    async submit() {
      try {
        const res = await this.$refs[this.safeName].validate()
        if (res) {
          this.$emit('onValid')
        }
        return res
      } catch (e) {
        return false
      }
    },

    clear() {
      this.$refs[this.safeName].reset()
    }
  }
}
</script>

<style src="./KForm.scss" lang="scss" />
