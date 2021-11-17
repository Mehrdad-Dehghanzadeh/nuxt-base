<template>
  <article class="uikit-page">
    <h1 class="heading-1 text-center mb-30">UIKIT</h1>

    <section class="card text-center">
      <h2 class="heading-3">typography</h2>
      <hr class="divider divider--light" />

      <div class="row">
        <div class="col">
          <h1 class="heading-1">heading-1</h1>
          <h2 class="heading-2">heading-2</h2>
          <h3 class="heading-3">heading-3</h3>
          <h4 class="heading-4">heading-4</h4>
          <h5 class="heading-5">heading-5</h5>
          <h6 class="heading-6">heading-6</h6>
        </div>

        <div class="col">
          <h5 class="subtitle-1">subtitle-1</h5>
          <h5 class="subtitle-2">subtitle-2</h5>
        </div>

        <div class="col">
          <p class="body-1">body-1</p>
          <p class="body-2">body-2</p>
          <p class="caption">caption</p>
          <p class="overline">overline</p>
        </div>
      </div>
    </section>

    <section class="card mt-30 text-center">
      <h2 class="heading-3">divider</h2>

      <div class="row">
        <div class="col">
          <p class="subtitle">divider</p>
          <hr class="divider" />
        </div>

        <div class="col">
          <p class="subtitle">divider-dashed</p>
          <hr class="divider-dashed" />
        </div>

        <div class="col">
          <p class="subtitle">divider-dotted</p>
          <hr class="divider-dotted" />
        </div>
      </div>
    </section>

    <section class="card mt-30">
      <h2 class="heading-3 text-center">buttons</h2>

      <div class="mt-10">
        <v-btn size="xs" color="secondary"> xs </v-btn>
        <v-btn size="sm" color="primary" icon="plus"> sm </v-btn>
        <v-btn size="lg" color="secondary" icon="plus" append ltr> lg </v-btn>
        <v-btn size="xl" color="primary" icon="plus" text="xl" ltr />
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: 'UikitPage',

  layout: 'full',
}
</script>

<style></style>
