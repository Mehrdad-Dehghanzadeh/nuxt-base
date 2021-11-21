<template>
  <article class="ticket-answer-page">
    <section class="card mt-55">
      <h1 class="heading-1 text-center">جزئیات تیکت</h1>
      <hr class="divider" />

      <v-answers :ticketID="ticketID" />
    </section>
  </article>
</template>

<script>
import { decode } from '@helpers/utils'
import VAnswers from '@shared/VAnswers/VAnswers'

export default {
  name: 'TicketDetailsPage',
  components: { VAnswers },

  async asyncData({ store, params }) {
    const ticketID = decode(params.id)
    await store.dispatch('answers/read', ticketID)

    return {
      ticketID,
    }
  },

  head() {
    return {
      title: 'جزئیات تیکت',
    }
  },
}
</script>

<style lang="scss" src="./style.scss" />
