<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="{ ...rules, required: required }"
    slim
  >
    <div
      :class="[
        'k-select',
        {
          'k-select--open': focused,
          'k-select--error': errors.length
        },

        'control',
        {
          'control--focused': focused,
          'control--solo': solo,
          'control--disabled': disabled,
          'control--readonly': readonly
        }
      ]"
    >
      <label
        v-if="!solo && label"
        :for="safeId"
        :class="['control__label', { 'control__label-required': required }]"
        @click="focus"
        @mousedown.prevent
        v-text="label"
      />

      <input
        :id="safeId"
        :value="hasValue ? 1 : null"
        :name="safeName"
        type="hidden"
      />

      <div
        ref="field"
        :class="['k-select__field', 'control__field', inputClass]"
        @click.self="focus"
        @mousedown.self.prevent
      >
        <div
          v-if="icon"
          class="control__prepend"
          @click="focus"
          @mousedown.prevent
        >
          <span :class="`icon icon-${icon}`" />
        </div>

        <div class="control__append" @mousedown.prevent>
          <slot name="action" />
          <span
            v-if="multiple"
            v-show="focused && hasValue"
            class="k-select__count"
            @mousedown.prevent
          >
            <span class="direction-ltr">+{{ selectedValue.length }}</span>
          </span>

          <span
            v-if="!(hasValue && clearable)"
            class="k-select__handle control__action"
            @click="toggleMenu"
          >
            <span class="icon icon-chevron-down" />
          </span>

          <span
            v-if="clearable"
            v-show="hasValue && !focused"
            class="control__action"
            @click="clear"
          >
            <span class="fg-red icon icon-x-circle" />
          </span>

          <span
            v-if="suffix"
            class="control__suffix"
            @click="focus"
            v-text="suffix"
          />
        </div>

        <div
          class="control__wrapper"
          @click.self="focus"
          @mousedown.self.prevent
        >
          <div
            v-show="!focused && hasValue"
            class="k-select__chips"
            @click="focus"
            @mousedown.prevent
          >
            <span
              v-for="item in selectedValue.slice(0, maxChips)"
              :key="item[itemValue]"
              :class="{
                'k-select__chip': multiple
              }"
            >
              {{ item[itemText] }}
            </span>

            <span
              v-if="selectedValue.length > maxChips"
              class="k-select__more-value"
              :title="multipleMoreValueTitle"
            >
              <span class="direction-ltr"
                >+{{ selectedValue.length - maxChips }}</span
              >

              مورد دیگر
            </span>
          </div>

          <input
            :id="safeId"
            ref="input"
            :placeholder="localPlaceholder"
            :disabled="disabled"
            v-bind="$attrs"
            autocomplete="off"
            :class="[
              {
                'k-select__input--invisible': !focused && hasValue
              },
              'control__input'
            ]"
            v-on="listeners"
          />
        </div>

        <k-progress
          v-if="loading"
          type="determinate"
          class="k-select__loading"
        />
      </div>

      <em v-show="errors.length" class="control__error" v-text="errors[0]" />

      <div
        v-show="focused"
        ref="menu"
        class="k-select__menu"
        @scroll="checkScroll"
        @mousedown.prevent
      >
        <span v-if="!items.length" class="k-select__message">
          {{ message }}
        </span>

        <ul
          v-else
          :class="[
            'k-select__options',
            {
              'k-select__options--multiple': multiple
            }
          ]"
        >
          <li
            v-for="item in items"
            :key="item[itemValue]"
            :class="[
              'k-select__option',
              {
                'k-select__option--active':
                  hasValue && selectedMapping[item[itemValue]]
              }
            ]"
            @click="onSelect(item)"
          >
            <slot name="item" v-bind="{ item }">{{ item[itemText] }}</slot>
          </li>
        </ul>
      </div>
    </div>
  </validation-provider>
</template>

<script>
import controlMixin from '@mixins/control'
import KProgress from '@kits/KProgress/KProgress'

import { debounce } from '@helpers/utils'
import { deepClone } from '@helpers/object'
import { isHidden } from '@helpers/dom'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'KSelectServer',
  components: { KProgress, ValidationProvider },

  mixins: [controlMixin],

  inheritAttrs: false,

  props: {
    value: {
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'انتخاب کنید ...'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    itemText: {
      type: String,
      default: 'title'
    },
    resource: {
      type: String,
      required: true
    },
    action: {
      type: String,
      default: 'read'
    },
    pathId: {
      type: [String, Number],
      default: ''
    },
    pageSize: {
      type: Number,
      default: 25
    },
    params: {
      type: Object,
      default: () => {}
    },
    searchBy: {
      type: String,
      default: 'name'
    },
    standby: {
      type: Boolean,
      default: false
    },
    typeLimit: {
      type: Number,
      default: 3
    },
    multiple: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    arrayValue: {
      type: Array,
      default: () => []
    },
    maxChips: {
      type: [String, Number],
      default: 3
    }
  },

  data() {
    return {
      items: [],

      selectedValue: [],
      selectedMapping: {},

      searchText: '',

      focused: false,

      loading: false
    }
  },

  computed: {
    listeners() {
      return {
        focus: this.onFocus,
        blur: this.onBlur,
        input: debounce((e) => this.onSearch(e.target.value), 800)
      }
    },

    hasValue() {
      return this.selectedValue.length
    },

    localPlaceholder() {
      return this.focused
        ? 'جست و جو کنید ...'
        : this.solo
        ? this.label || this.placeholder
        : this.placeholder
    },

    message() {
      return this.searchText && this.searchText.length >= this.typeLimit
        ? this.loading
          ? 'در حال جست و جو ...'
          : 'موردی یافت نشد'
        : `حداقل ${this.typeLimit} حرف وارد کنید ...`
    },

    multipleMoreValueTitle() {
      return this.selectedValue
        .slice(this.maxChips, this.selectedValue.length)
        .map((i) => i[this.itemText])
    }
  },

  watch: {
    value: {
      handler(newValue) {
        if (!this.observer) {
          this.observer = true
          return
        }

        this.setValue(newValue)
      },
      immediate: true
    }
  },

  beforeCreate() {
    this.observer = true
  },

  created() {
    this.reset()
  },

  mounted() {
    document.body.prepend(this.$refs.menu)

    if (this.standby) {
      return
    }

    this.read()
  },

  beforeDestroy() {
    if (this.$refs.menu.parentNode) {
      this.$refs.menu.parentNode.removeChild(this.$refs.menu)
    }
  },

  methods: {
    read() {
      this.loading = true

      const params = {
        page: this.page,
        pageSize: this.pageSize,
        ...this.params
      }

      if (this.searchText) {
        params[this.searchBy] = this.searchText
      }

      this.$api[this.resource]
        [this.action](params, this.pathId)
        .then((res) => {
          this.isEnd = this.page * this.pageSize >= res.data.totalCount
          this.page += 1

          this.setData(res.data.data)
          if (this.value) {
            this.setValue(this.value)
          }

          this.loading = false
        })
        .catch((e) => {
          this.$snack.response(e)

          this.setData()

          this.loading = false
        })
    },

    setData(data = []) {
      this.cacheItems = this.cacheItems.concat(data)

      const checkList = {}

      this.items = this.cacheItems.filter((item) => {
        return (
          !checkList[item[this.itemValue]] &&
          (checkList[item[this.itemValue]] = true)
        )
      })
    },

    setValue(value) {
      const arrayValue =
        value === null || value === undefined
          ? []
          : this.multiple
          ? value
          : [value]

      const selected = []
      const mapping = {}
      arrayValue.forEach((item) => {
        const result = this.returnObject
          ? item
          : this.items.find((i) => i[this.itemValue] === item)
        if (result !== undefined) {
          selected.push(result)
          mapping[result[this.itemValue]] = true
        }
      })

      this.selectedValue = selected
      this.selectedMapping = mapping
      this.$emit('update:arrayValue', this.selectedValue)
    },

    updateValue() {
      this.observer = false

      const arrayValue = this.selectedValue.map((i) =>
        this.returnObject ? i : i[this.itemValue]
      )

      const value = this.multiple
        ? arrayValue
        : arrayValue.length
        ? arrayValue[0]
        : null

      this.$emit('input', value)
      this.$emit('update:arrayValue', this.selectedValue)
    },

    onSearch(value) {
      if (!value || value.length < this.typeLimit) {
        return
      }

      this.searchText = value

      this.reset()
      this.read()

      this.$nextTick(() => {
        this.setPosition(this.arrow === 1)
      })
    },

    onSelect(item) {
      if (this.multiple) {
        this.selectedMapping[item[this.itemValue]]
          ? this.removeItem(item)
          : this.addItem(item)
      } else {
        this.addItem(item)
        this.blur()
      }

      this.updateValue()
    },

    focus(e) {
      e.preventDefault()

      if (this.focused) {
        return
      }

      this.$refs.input.focus()
    },

    blur() {
      this.$refs.input.blur()
    },

    onFocus() {
      this.focused = true

      if (this.readonly) {
        return
      }

      this.$nextTick(() => {
        this.setPosition()
      })
    },

    onBlur(e) {
      this.focused = false

      this.searchText = ''

      this.$refs.input.value = ''

      this.$refs.menu.scrollTop = 0
    },

    addItem(item) {
      if (this.multiple) {
        this.selectedValue.push(item)
        this.selectedMapping[item[this.itemValue]] = true

        return
      }

      this.selectedValue = [item]
      this.selectedMapping = { [item[this.itemValue]]: true }
    },

    removeItem(item) {
      this.selectedValue.splice(this.selectedValue.indexOf(item), 1)
      delete this.selectedMapping[item[this.itemValue]]
    },

    checkScroll(e) {
      clearTimeout(this.scrollTimeout)

      this.scrollTimeout = setTimeout(() => {
        const $el = e.target

        if (
          !isHidden($el) &&
          $el.scrollHeight - $el.scrollTop - $el.clientHeight <= 100
        ) {
          if (!this.isEnd) {
            this.read()
          }
        }
      }, 400)
    },

    setPosition(forceUp) {
      const menuHeight = this.$refs.menu.offsetHeight
      const { height, width, top, left } =
        this.$refs.field.getBoundingClientRect()
      this.$refs.menu.style.minWidth = width + 'px'
      this.$refs.menu.style.right =
        document.body.offsetWidth - (left + width) + 'px'

      if (
        (!forceUp && top + menuHeight + height + 5 < window.innerHeight) ||
        top - 10 < menuHeight
      ) {
        this.$refs.menu.style.top = top + window.scrollY + height + 7 + 'px'
        this.arrow = 2
      } else {
        this.$refs.menu.style.top =
          top + window.scrollY - (10 + menuHeight) + 'px'
        this.arrow = 1
      }
    },

    toggleMenu(e) {
      this[this.focused ? 'blur' : 'focus'](e)
    },

    clear() {
      this.selectedValue = []
      this.selectedMapping = {}

      this.updateValue()
    },

    reset() {
      this.page = 1

      this.items = []
      this.cacheItems = deepClone(this.selectedValue)
    }
  }
}
</script>
