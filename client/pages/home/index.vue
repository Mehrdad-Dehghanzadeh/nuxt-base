<template>
  <section class="home-page" id="home-page">
    <h1 class="text-center heading-1 mb-50">سامانه تیکتینگ</h1>

    <nav class="home-page-nav">
      <ul class="home-page-nav__menu">
        <li class="home-page-nav__item">
          <nuxt-link class="home-page-nav__link" to="/tickets">
            tickets
            <i class="icon-twitch"></i>
          </nuxt-link>
        </li>

        <li class="home-page-nav__item">
          <nuxt-link class="home-page-nav__link" to="/panel/tickets">
            panel
            <i class="icon-layout"></i>
          </nuxt-link>
        </li>
      </ul>
    </nav>
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

<style lang="scss" src="./style.scss" />
