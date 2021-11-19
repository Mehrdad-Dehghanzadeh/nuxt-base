<template>
  <main class="error-layout">
    <div class="container">
      <h1 class="text-center heading-1">{{ error.statusCode }}</h1>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: ['error'],

  layout: 'full',
}
</script>

<style></style>
