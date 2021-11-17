<template>
  <main class="error-layout">
    <div class="container">
      <h1 class="text-center">{{ error.statusCode }}</h1>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: ['error'],
}
</script>

<style></style>
