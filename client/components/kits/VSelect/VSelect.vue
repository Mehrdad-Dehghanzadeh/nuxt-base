<template>
  <validation-provider v-slot="{ errors }" :rules="rules" slim>
    <div
      :class="[
        'control',
        {
          'control--error': errors.length,
          'control--disabled': disabled,
          'direction-ltr': ltr,
        },
      ]"
    >
      <label
        :class="['control__label', { 'control__label-required': required }]"
        :for="safeId"
        v-text="label"
      />

      <input :value="localValue" :id="safeId" :name="safeName" type="hidden" />
      <div :class="['control__wrapper', 'select', { 'select--open': open }]">
        <span
          v-if="clearable"
          v-show="hasValue && !open"
          class="control__action"
          @click="clear"
        >
          <span class="fg-error x-circle"></span>
        </span>

        <i v-if="icon" :class="['control__icon', `icon-${icon}`]"></i>

        <span
          @mousedown.prevent
          @click="handleClick"
          v-show="!(hasValue && clearable)"
        >
          <span class="select__handle icon-chevron-down"></span>
        </span>

        <div class="control__wrapper">
          <input
            ref="input"
            class="control__input pl-15"
            v-on="listeners"
            v-bind="$attrs"
            :id="safeId"
            :name="safeName"
            :placeholder="hint"
            :disabled="disabled"
            :required="required"
            :value="text"
            autocomplete="off"
          />
        </div>

        <em v-show="errors.length" class="control__error" v-text="errors[0]" />

        <transition>
          <div ref="menu" v-show="open" @mousedown.prevent class="select__menu">
            <span v-if="!localItems.length" class="select__no-data">
              {{ $t('control.noResult') }}
            </span>

            <ul v-else class="select__options">
              <li
                v-for="item in localItems"
                :key="item[itemValue]"
                @click="onSelect(item)"
                :class="[
                  'select__option',
                  {
                    'select__option--active':
                      hasValue && localValue[itemValue] === item[itemValue],
                  },
                ]"
              >
                {{ item[itemText] }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import controlMinix from '@mixins/control'
import { debounce } from '@helpers/utils'

export default {
  name: 'VSelect',
  components: { ValidationProvider },
  mixins: [controlMinix],

  props: {
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemValue: {
      type: String,
      default: 'id',
    },
    itemText: {
      type: String,
      default: 'name',
    },
    icon: {
      type: String,
      default: null,
    },
    rules: {
      type: [String, Object],
      default: null,
    },
    format: {
      type: Function,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    ltr: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      text: '',
      localItems: this.formatItems(this.items),
      localValue: null,
      open: false,
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: debounce((e) => this.onSearch(e.target.value), 400),
        focus: this.onOpen,
        blur: this.onClose,
      }
    },

    hasValue() {
      return this.localValue instanceof Object
    },

    hint() {
      return this.placeholder !== undefined
        ? this.placeholder
        : this.$t('control.placeholder.select')
    },
  },

  watch: {
    items(newValue) {
      this.localItems = this.formatItems(newValue)
      this.checkExist()
    },

    value: {
      handler(newValue) {
        const target = this.temp.find((i) => i[this.itemValue] === newValue)
        this.updateValue(target || null, false)
      },
      immediate: true,
    },
  },

  mounted() {
    this.manualUpdate = true
    this.$root.$el.prepend(this.$refs.menu)
  },

  beforeDestroy() {
    if (this.$refs.menu.parentNode) {
      this.$refs.menu.parentNode.removeChild(this.$refs.menu)
    }
  },

  methods: {
    updateValue(item, updateParent = true) {
      this.localValue = item
      this.text = this.hasValue ? item[this.itemText] : null

      if (updateParent) {
        this.$nextTick(() => {
          this.$emit('input', this.hasValue ? item[this.itemValue] : null)
        })
      }
    },

    formatItems(list) {
      let newList
      if (list.length && typeof list[0] !== 'object') {
        newList = list.map((i) => {
          return {
            [this.itemValue]: i,
            [this.itemText]: this.format
              ? this.format(i.toString())
              : i.toString(),
          }
        })
      } else {
        newList = list
      }
      this.temp = newList
      return newList
    },

    checkExist() {
      if (this.hasValue) {
        const item = this.temp.find(
          (i) => i[this.itemValue] === this.localValue[this.itemValue]
        )
        if (item === undefined) {
          this.updateValue(null, false)
        }
      }
    },

    onSearch(value, upadte = true) {
      if (upadte) this.text = value
      this.localItems = this.temp.filter((i) =>
        i[this.itemText].includes(value)
      )
    },

    onSelect(item) {
      if (
        !this.hasValue ||
        this.localValue[this.itemValue] !== item[this.itemValue]
      ) {
        this.updateValue(item)
        this.manualUpdate = false
      }
      this.$refs.input.blur()
    },

    onOpen() {
      this.open = true
      this.text = null
      this.$nextTick(() => {
        this.setPosition()
      })
    },

    onClose(e) {
      this.open = false
      if (this.text) {
        setTimeout(() => {
          this.onSearch('', false)
        }, 220)
      }
      if (this.manualUpdate) {
        this.text = this.hasValue ? this.localValue[this.itemText] : ''
      }
      this.manualUpdate = true
    },

    setPosition() {
      const menuHeight = this.$refs.menu.offsetHeight
      const { height, width, top, left } =
        this.$refs.input.getBoundingClientRect()
      this.$refs.menu.style.width = width + 'px'
      this.$refs.menu.style.left = left + 'px'
      if (
        top + menuHeight + height + 10 < window.innerHeight ||
        top - 10 < menuHeight
      ) {
        this.$refs.menu.style.top = top + window.scrollY + height + 5 + 'px'
      } else {
        this.$refs.menu.style.top =
          top + window.scrollY - (5 + menuHeight) + 'px'
      }
    },

    handleClick() {
      this.$refs.input[this.open ? 'blur' : 'focus']()
    },

    clear() {
      this.selectedValue = []
      this.selectedMapping = {}
      this.updateValue()
    },
  },
}
</script>

<style src="./VSelect.scss" lang="scss" />
