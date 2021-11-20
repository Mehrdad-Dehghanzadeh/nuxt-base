<template>
  <li class="menu__item" v-on="$listeners">
    <slot v-if="slim" v-bind="{ class: 'menu__link' }" />
    <nuxt-link v-else :to="to" class="menu__link">
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'VMenuItem',
  props: {
    to: {
      type: [String, Object],
      default: '#',
    },
    slim: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
