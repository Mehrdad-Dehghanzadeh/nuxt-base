<template>
  <section class="home-page" id="home-page">
    <h1>Hello World</h1>
    <div class="text-center">
      <nuxt-link class="fg-info" to="/tickets">tickets</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',

  head() {
    return {
      title: 'صفحه اصلی ',
    }
  },
}
</script>
