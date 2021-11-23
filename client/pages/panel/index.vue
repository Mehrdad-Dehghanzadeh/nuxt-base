<template>
  <section class="panel-page" id="panel-page">
    <nuxt-child />
  </section>
</template>

<script>
export default {
  name: 'PanelPage',
  head() {
    return {
      title: 'پنل ادمین '
    }
  },
  layout: 'panel',
}
</script>

<style></style>
