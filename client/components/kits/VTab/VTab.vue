<template>
  <section class="v-tab">
    <div class="v-tab-bar">
      <ul :class="['v-tab-bar__container', { 'direction-ltr': ltr }]">
        <li class="v-tab-bar__item" v-for="(item, index) in tabs" :key="index">
          <slot :name="`tab-${index + 1}`" :tab="item">
            <strong>
              <i
                v-if="item.icon"
                :class="['vertical-align-middle', `icon-${item.icon}`]"
              />
              <span> {{ item.title ? item.title : item }} </span>
            </strong>
          </slot>
        </li>
      </ul>
    </div>

    <div class="v-tab__contrainer">
      <slot />
    </div>
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
      localValue: this.value
    }
  },

  watch: {
    localValue() {}
  }
}
</script>

<style lang="scss" src="./VTab.scss" />
