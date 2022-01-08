<template>
  <section class="v-tab">
    <!-- Tab Bar -->
    <div class="v-tab-bar">
      <ul :class="['v-tab-bar__container', { 'direction-ltr': ltr }]">
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="[
            'v-tab-bar__item',
            { 'v-tab-bar__item--active': index + 1 == localValue }
          ]"
          @click="switchTab(index)"
        >
          <slot :name="`tab-${index + 1}`" :tab="item">
            <span>
              <i
                v-if="item.icon"
                :class="['vertical-align-middle', `icon-${item.icon}`]"
              />
              <span> {{ item.title ? item.title : item }} </span>
            </span>
          </slot>
        </li>
      </ul>
    </div>
    <!-- Tab Bar -->

    <!-- Tab Conent -->
    <div ref="container" class="v-tab__container">
      <slot name="item" />
    </div>
    <!-- Tab Conent -->
  </section>
</template>

<script>
export default {
  name: 'VTab',

  props: {
    value: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#2f2faf'
    },
    tabs: {
      type: Array,
      required: true,
      validator: (val) => val.length > 0
    },
    ltr: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localValue: this.value,
      activeItem: null
    }
  },

  watch: {
    localValue: {
      handler(val) {
        if (process.client) {
          console.log(this.$refs.container)
        }
        if (val > 0) {
          this.activeItem = this.$slots.item[val - 1]
        }
      },

      immediate: true
    }
  },

  methods: {
    switchTab(index) {
      this.localValue = index + 1
    }
  }
}
</script>

<style lang="scss" src="./VTab.scss" />
