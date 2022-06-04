<template>
  <div
    :class="[
      'k-checkbox',
      blockClass,
      {
        'k-checkbox--align': align,
        'k-checkbox--inline': inline
      },

      'control',
      {
        'control--disabled': disabled
      }
    ]"
  >
    <label class="k-checkbox__label">
      <input
        v-model="checked"
        :value="nativeValue"
        v-bind="$attrs"
        :disabled="disabled"
        v-on="$listeners"
        class="k-checkbox__input"
        type="checkbox"
      />

      <span class="k-checkbox__toggle" />

      <span v-if="label || $slots.default" class="k-checkbox__title">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'KCheckbox',

  inheritAttrs: false,

  props: {
    value: {
      default: undefined
    },
    nativeValue: {
      default: undefined
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    align: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    block: {
      type: String,
      default: null
    }
  },

  computed: {
    checked: {
      get() {
        return this.nativeValue ? this.value : this.value === this.trueValue
      },
      set(val) {
        const value = this.nativeValue
          ? val
          : val
          ? this.trueValue
          : this.falseValue

        this.$nextTick(() => {
          this.$emit('input', value)
          this.$emit('change', value)
        })
      }
    },

    blockClass() {
      let classes = ''

      if (this.block) {
        this.block.split(',').forEach((i) => {
          classes += `k-checkbox--block-${i} `
        })
      }

      return classes
    }
  }
}
</script>

<style src="./KCheckbox.scss" lang="scss" />
