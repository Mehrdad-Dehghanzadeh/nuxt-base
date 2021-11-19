<template>
  <article class="tickets-page" id="tickets-page">
    <section class="card">
      <div class="add-btn-wrapper">
        <v-btn icon="plus" size="xs" color="success" @click="modal = true">
          ثبت تیکت
        </v-btn>
      </div>

      <h1 class="text-center heading-2">لیست تیکت ها</h1>
      <hr class="divider" />

      <div class="row">
        <div class="col-md-4">
          <v-ticket />
        </div>
      </div>
    </section>

    <v-modal size="xs" v-model="modal" title="ثبت تیکت">
      <p-modal />
    </v-modal>
  </article>
</template>

<script>
import VModal from '@kits/VModal/VModal'
import VTicket from '@shared/VTicket/VTicket'
import PModal from './_partial.modal'

export default {
  name: 'TicketsPage',
  components: { VModal, PModal, VTicket },

  data() {
    return {
      modal: false,
    }
  },
}
</script>

<style lang="scss" src="./style.scss" />
