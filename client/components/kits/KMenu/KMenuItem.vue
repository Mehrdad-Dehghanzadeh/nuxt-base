<template>
  <li class="k-menu__item" v-on="$listeners">
    <slot v-if="slim" v-bind="{ class: 'k-menu__link' }" />
    <nuxt-link v-else :to="to" class="k-menu__link" v-bind="$attrs">
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'KMenuItem',
  props: {
    to: {
      type: [String, Object],
      default: '#'
    },
    slim: {
      type: Boolean,
      default: false
    }
  }
}
</script>
