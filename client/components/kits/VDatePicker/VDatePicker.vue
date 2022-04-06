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
          :id="safeId"
          :name="safeName"
          :placeholder="hint"
          :required="required"
          v-bind="$attrs"
          @click.stop="open"
          :value="localValue"
          :disabled="disabled"
          readonly
        />

        <em v-show="errors.length" class="control__error" v-text="errors[0]" />
      </div>
    </div>
    <client-only>
      <jalali-datepicker
        :value="localValue"
        :element="safeId"
        :show="show"
        :min="min"
        :max="max"
        :type="type"
        @input="updateValue"
        @close="show = false"
        :format="localFormat"
        :input-format="localDisplayFormat"
        :display-format="localDisplayFormat"
      />
    </client-only>
  </validation-provider>
</template>

<script>
import moment from 'moment-jalaali'
import controlMixin from '@mixins/control'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'VDatepicker',
  components: { ValidationProvider },
  mixins: [controlMixin],
  inheritAttrs: false,

  props: {
    value: {
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Object],
      default: null
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
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
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time'].includes(value)
      }
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    isTime() {
      return this.type === 'time'
    },

    localValue() {
      return this.value
        ? this.isTime
          ? this.value
          : moment(this.value).format('jYYYY/jMM/jDD')
        : ''
    },

    localFormat() {
      return this.isTime ? 'HH:mm' : 'YYYY-MM-DDTHH:mm:ssZ'
    },

    localDisplayFormat() {
      return this.isTime ? 'HH:mm' : 'jYYYY/jMM/jDD'
    },

    hint() {
      return (
        this.$attrs.placeholder ||
        this.$t('control.placeholder.input', [this.label])
      )
    }
  },

  methods: {
    open() {
      if (!this.disabled) this.show = true
    },

    updateValue(value) {
      this.$nextTick(() => {
        this.$emit('input', value)
      })
    }
  }
}
</script>

<style src="./VDatepicker.scss" lang="scss" />
