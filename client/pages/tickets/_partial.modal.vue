<template>
  <v-form ref="form">
    <div class="row">
      <div class="col">
        <v-input label="عنوان تیکت" v-model="model.title" required />
      </div>
      <div class="col">
        <v-input label="عنوان تیکت" v-model="model.message" required />
      </div>
    </div>

    <div class="text-left">
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
        @click="modalClose()"
      >
        ثبت
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'PartialModal',

  data() {
    return {
      model: {
        title: '',
        message: '',
      },
    }
  },

  methods: {
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
  },
}
</script>

<style></style>
