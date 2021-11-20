<template>
  <v-form ref="form" @onValid="createTicket()">
    <v-input label="عنوان تیکت" v-model="model.title" required />

    <v-textarea label="متن تیکت" v-model="model.message" required />

    <div class="text-left mt-50">
      <v-btn
        type="button"
        size="xs"
        color="red"
        icon="x-circle"
        @click="modalClose()"
      >
        بستن
      </v-btn>

      <v-btn
        type="submit"
        size="xs"
        color="success"
        icon="plus"
        :loading="loading"
      >
        ثبت
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PartialModal',

  data() {
    return {
      model: {
        title: '',
        message: '',
      },
      loading: false,
    }
  },

  methods: {
    ...mapActions({
      read: 'tickets/read',
      create: 'tickets/create',
    }),

    modalClose() {
      this.clearForm()
      $nuxt.$emit('closeModal')
    },

    clearForm() {
      Object.keys(this.model).forEach((key) => {
        this.model[key] = ''
      })
      this.$refs.form.clear()
    },

    async createTicket() {
      this.loading = true

      try {
        await this.create(this.model)
        await this.read()
        await this.modalClose()
      } catch (error) {
        this.$snack.error(error)
      }

      this.loading = false
    },
  },
}
</script>

<style></style>
