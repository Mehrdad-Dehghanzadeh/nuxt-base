<template>
  <section class="k-tab">
    <!-- Tab Bar -->
    <div class="k-tab-bar">
      <ul :class="['k-tab-bar__container', { 'direction-ltr': ltr }]">
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="[
            'k-tab-bar__item',
            { 'k-tab-bar__item--active': index + 1 == localValue }
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
    <div class="k-tab__container">
      <slot />
    </div>
    <!-- Tab Conent -->
  </section>
</template>

<script>
export default {
  name: 'KTab',

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
      localValue: 0,
      tabItems: []
    }
  },

  watch: {
    localValue(newVal, oldVal) {
      if (process.client) {
        if (oldVal) {
          this.tabItems[oldVal - 1].active = false
        }
        this.tabItems[newVal - 1].active = true
      }
    }
  },

  methods: {
    switchTab(index) {
      this.localValue = index + 1
    }
  },

  created() {
    this.tabItems = this.$children
    this.localValue = 1
  }
}
</script>

<style lang="scss" src="./KTab.scss" />
