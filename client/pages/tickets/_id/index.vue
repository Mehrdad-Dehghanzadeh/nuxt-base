<template>
  <article class="ticket-answer-page">
    <section class="card mt-55">
      <h1 class="heading-1 text-center">جزئیات تیکت</h1>
      <hr class="divider" />

      <div class="row">
        <div
          class="col-md-4 col-sm-6 col-xs-12"
          v-for="item of answers"
          :key="item.id"
        >
          <div class="answer">
            <p class="subtitle-1 text-center">پاسخ</p>
            <hr class="divider" />
            <p class="body-1">{{ item.message }}</p>
          </div>
        </div>
      </div>

      <v-form id="send-answer-form" class="mt-60 mb-25" @onValid="sendAnswer">
        <div class="row">
          <div class="col-md-4 col-sm-12">
            <v-textarea
              label="پاسخ"
              v-model="model.message"
              noResize
              required
            />

            <div class="text-left">
              <v-btn
                size="xs"
                color="success"
                icon="message-square"
                text="پاسخ"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </v-form>
    </section>
  </article>
</template>

<script>
import { decode } from '@helpers/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TicketDetailsPage',

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

  data() {
    return {
      loading: false,
      model: {
        message: '',
      },
    }
  },

  computed: {
    ...mapGetters({
      answers: 'answers/getData',
    }),
  },

  methods: {
    ...mapActions({
      create: 'answers/create',
      read: 'answers/read',
    }),

    async sendAnswer() {
      this.loading = true

      try {
        this.model.ticketID = this.ticketID
        await this.create(this.model)
        await this.read(this.ticketID)
      } catch (error) {
        this.$snack.error(error)
      }

      this.loading = false
    },
  },
}
</script>

<style lang="scss" src="./style.scss" />
