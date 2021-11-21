<template>
  <section class="panel-ticket-message">
    <v-answers :ticketID="ticketID" />
    <div class="mt-40 text-left">
      <v-btn
        type="button"
        size="xs"
        color="red"
        icon="x-circle"
        text="بستن"
        @click="modalClose()"
      />
    </div>
  </section>
</template>

<script>
import VAnswers from '@shared/VAnswers/VAnswers'

export default {
  name: 'PartialMessage',
  components: { VAnswers },

  props: {
    ticketID: {
      type: [String, Number],
      required: true,
    },
  },

  methods: {
    modalClose() {
      this.$nuxt.$emit('closeModal')
    },
  },
}
</script>

<style></style>
