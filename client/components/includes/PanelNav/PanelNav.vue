<template>
  <aside class="panel-nav">
    <div class="pt-20 text-center">logo</div>
    <nav class="panel-nav__wrapper">
      <ul class="py-25">
        <li class="panel-nav__item">
          <nuxt-link class="panel-nav__link" to="/panel/tickets">
            <i class="icon-twitch"></i>
            <span class="panel-nav__link-text">تیکت ها</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'PanelNav',
}
</script>

<style lang="scss" src="./PanelNav.scss" />
