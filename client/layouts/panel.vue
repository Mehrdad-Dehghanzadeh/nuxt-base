<template>
  <div class="panel-layout" id="panel-layout">
    <panel-header />

    <div class="panel-layout__wrapper">
      <panel-nav />
      <main class="panel-layout__container">
        <div class="container min-height-auto">
          <nuxt />
        </div>
      </main>
    </div>

    <panel-footer />
  </div>
</template>

<script>
import PanelHeader from '@includes/PanelHeader/PanelHeader'
import PanelFooter from '@includes/PanelFooter/PanelFooter'
import PanelNav from '@includes/PanelNav/PanelNav'

export default {
  name: 'PanelLayout',

  components: { PanelHeader, PanelFooter, PanelNav },
}
</script>

<style lang="scss" src="./panel.scss" />
