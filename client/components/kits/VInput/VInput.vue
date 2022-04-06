<template>
  <validation-provider v-slot="{ errors }" :rules="rules" slim>
    <div
      :class="[
        'control',
        {
          'control--error': errors.length,
          'control--disabled': disabled,
          'direction-ltr': ltr
        }
      ]"
    >
      <label
        :class="['control__label', { 'control__label-required': required }]"
        :for="safeId"
        v-text="label"
      />

      <div class="control__wrapper">
        <input
          class="control__input"
          v-on="listeners"
          v-bind="$attrs"
          :id="safeId"
          :name="safeName"
          :placeholder="hint"
          :disabled="disabled"
          :required="required"
          :value="value"
        />
      </div>

      <em v-show="errors.length" class="control__error" v-text="errors[0]" />
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import controlMinix from '@mixins/control'

export default {
  name: 'VInput',
  components: { ValidationProvider },
  mixins: [controlMinix],

  props: {
    value: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ltr: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => this.updateValue(e.target.value)
      }
    },

    hint() {
      return this.placeholder !== undefined
        ? this.placeholder
        : this.$u.translate('control.placeholder.input')
    }
  },

  methods: {
    updateValue(newVal) {
      this.$emit('input', newVal)
    },

    clear() {
      this.updateValue(null)
    }
  }
}
</script>

<style lang="scss" src="./VInput.scss" />
