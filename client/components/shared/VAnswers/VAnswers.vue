<template>
  <section>
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

    <hr v-show="answers.length > 0" class="divider mt-5" />

    <v-form id="send-answer-form" class="mb-25" @onValid="sendAnswer">
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-12">
          <v-textarea label="پاسخ" v-model="model.message" noResize required />

          <div class="text-center">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'VAnswers',

  props: {
    ticketID: {
      type: [String, Number],
      required: true,
    },
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

<style></style>
