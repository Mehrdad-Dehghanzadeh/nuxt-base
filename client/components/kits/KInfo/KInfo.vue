<template>
  <div class="k-info">
    <strong class="k-info__title">
      <i v-if="icon" :class="`icon icon-${icon}`" />
      {{ title }}
    </strong>

    <p class="k-info__text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'KInfo',

  props: {
    text: String,
    icon: String,
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./KInfo.scss"></style>
