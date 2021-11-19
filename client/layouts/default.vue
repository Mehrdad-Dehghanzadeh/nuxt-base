<template>
  <div class="default-layout">
    <default-header />

    <main class="default-main">
      <div class="container">
        <Nuxt />
      </div>
    </main>

    <default-footer />
  </div>
</template>
<script>
import DefaultHeader from '@includes/DeFaultHeader/DeFaultHeader'
import DefaultFooter from '@includes/DefaultFooter/DefaultFooter'

export default {
  components: { DefaultHeader, DefaultFooter },
  name: 'DefaultLayout',
}
</script>

<style></style>
