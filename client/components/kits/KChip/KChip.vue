<template>
  <span
    v-if="show"
    :class="[
      'k-chip',

      {
        'k-chip--clearable': clearable,
        'k-chip--outline': outline,
        'k-chip-copy': copy
      },

      `${color ? `k-chip--${color}` : ''}`
    ]"
    v-on="{ ...{ click: copy ? copyText : () => false }, ...$listeners }"
  >
    <span v-if="clearable && !copy" @click="onclear" class="k-chip__clear">
      <i class="icon-x"></i>
    </span>

    <span v-if="copy" class="display-inline-block">
      <i v-if="!isCopied" class="icon-copy"></i>
      <i v-else> کپی شد</i>
    </span>

    <slot />
  </span>
</template>
<script>

export default {
  name: 'KChip',
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '',
      validator: (val) =>
        ['success', 'alert', 'info', 'error', ''].includes(val)
    },
    copy: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: true,
      isCopied: false
    }
  },

  methods: {
    onclear() {
      this.show = false
      this.$emit('update:clearable')
    },

    copyText() {
      const text = this.$slots.default[0].text
      this.copyToClipboard(text)
    },

    copyToClipboard(text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text)
        return
      }
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.isCopied = true

          setTimeout(() => {
            this.isCopied = false
          }, 1555)
        })
        .catch((err) => {
          console.error('Async: Could not copy text: ', err)
        })
    }
  }
}
</script>

<style src="./KChip.scss" lang="scss" />
