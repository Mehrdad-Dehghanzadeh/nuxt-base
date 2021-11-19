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
import DefaultHeader from '@shared/DeFaultHeader/DeFaultHeader'
import DefaultFooter from '@shared/DefaultFooter/DefaultFooter'

export default {
  components: { DefaultHeader, DefaultFooter },
  name: 'DefaultLayout',
}
</script>

<style></style>
