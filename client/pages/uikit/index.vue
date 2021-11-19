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
        <v-btn size="xs" color="secondary" loading> xs </v-btn>
        <v-btn size="sm" color="primary" icon="plus"> sm </v-btn>
        <v-btn color="secondary" outline> md </v-btn>
        <v-btn size="lg" color="secondary" icon="plus" append ltr> lg </v-btn>
        <v-btn
          size="xl"
          color="primary"
          icon="plus"
          text="xl"
          ltr
          outline
          disabled
          loading
        />
      </div>
    </section>

    <section class="card mt-30">
      <h2 class="heading-3 text-center">inputs Elements</h2>
      <v-form>
        <div class="row">
          <div class="col-xl-4 col-md-6 col-xs-12">
            <v-input label="normal" v-model="model.normal" required />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <v-input label="disabled" v-model="model.disabled" disabled />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <v-date-picker v-model="model.date" label="time picker" required />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <v-select
              v-model="model.select"
              label="select"
              :items="items"
              required
            />
          </div>
        </div>

        <div class="text-center mt-30">
          <v-btn type="submit">submit</v-btn>
        </div>
      </v-form>
    </section>

    <section class="card mt-30">
      <h2 class="heading-3 text-center">modal</h2>

      <v-btn size="xs" color="primary" @click="modal.normal = true"
        >modal</v-btn
      >
      <v-btn size="xs" color="primary" @click="modal.lg = true" outline>
        lg modal
      </v-btn>
      <v-btn size="xs" color="primary" @click="modal.full = true">
        xs modal
      </v-btn>
    </section>

    <section class="card mt-30">
      <h2 class="heading-3 text-center">menu</h2>

      <div class="row">
        <div class="col">
          <p>light</p>
          <v-menu light>
            <v-menu-item> item-1 </v-menu-item>

            <v-menu-item> item-2 </v-menu-item>
          </v-menu>
        </div>

        <div class="col">
          <p>normal</p>
          <v-menu>
            <v-menu-item> item-1 </v-menu-item>

            <v-menu-item> item-2 </v-menu-item>
          </v-menu>
        </div>
      </div>
    </section>

    <section class="card mt-30">
      <h2 class="heading-3 text-center">snackbar</h2>

      <div class="mt-30">
        <v-btn @click="$snack.error('خطا')" color="red" outline> error </v-btn>
        <v-btn @click="$snack.success('قبول')" color="success" outline> success </v-btn>
        <v-btn @click="$snack.info('اطلاع')" color="info" outline> info </v-btn>
        <v-btn @click="$snack.alert('اخطار')" color="alert" outline> alert </v-btn>
      </div>
    </section>

    <!-- Modals -->
    <v-modal v-model="modal.normal" />
    <v-modal v-model="modal.lg" size="lg">
      <h3 class="heading-5 modal__title" slot="header">lg modal</h3>

      <div class="text-center">
        <p>modal content</p>
      </div>
    </v-modal>

    <v-modal v-model="modal.full" size="xs" title="xs modal">
      <div class="text-center">
        <p>modal content</p>
      </div>
    </v-modal>

    <!-- Modals -->
  </article>
</template>

<script>
import VModal from '@kits/VModal/VModal'
import VMenu from '@kits/VMenu/VMenu'
import VMenuItem from '@kits/VMenu/VMenuItem'

export default {
  name: 'UikitPage',
  components: { VModal, VMenu, VMenuItem },

  layout: 'full',

  data() {
    return {
      model: {
        normal: '',
        date: '',
        disabled: 'disabled',
        select: '',
      },
      modal: {
        normal: false,
        lg: false,
        full: false,
      },
      items: [
        { name: 'item1', id: '1' },
        { name: 'item2', id: '2' },
        { name: 'item3', id: '3' },
      ],
    }
  },
}
</script>

<style></style>
