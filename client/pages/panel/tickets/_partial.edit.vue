<template>
  <v-form id="ticket-edit-form" ref="form" @onValid="updateTicket">
    <div class="row">
      <div class="col-sm-6 col-xs-12">
        <v-input label="عنوان" v-model="model.title" required />
      </div>

      <div class="col-sm-6 col-xs-12">
        <v-date-picker label="تاریخ ثبت" v-model="model.received" required />
      </div>

      <div class="col-sm-6 col-xs-12">
        <v-select
          label="وضیعت"
          v-model="model.status"
          :items="selectItem"
          required
        />
      </div>

      <div class="col-sm-6 col-xs-12">
        <v-textarea label="پیام" v-model="model.message" required />
      </div>
    </div>

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
        icon="edit"
        :loading="loading"
      >
        ویرایش
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import VDatePicker from '@kits/VDatePicker/VDatePicker'
import { mapGetters } from 'vuex'
export default {
  components: { VDatePicker },
  name: 'PartialEdit',

  props: {
    item: {
      type: Object,
    },
  },

  data() {
    return {
      model: {
        id: 0,
        message: '',
        status: '',
        title: '',
        received: '',
      },

      selectItem: [
        { name: 'درحال انتظار', id: 'pending' },
        { name: 'جواب داده', id: 'answered' },
        { name: 'بسته', id: 'closed' },
      ],
    }
  },

  watch: {
    item() {
      this.model = { ...this.model, ...this.item }
    },
  },

  computed: {
    ...mapGetters({
      loading: 'tickets/getLoading',
    }),
  },

  methods: {
    modalClose() {
      this.$refs.form.clear()
      this.$nuxt.$emit('closeModal')
    },

    async updateTicket() {
      await this.$store.dispatch('tickets/update', this.model)
      await this.$emit('updateTicket')
    },
  },
}
</script>

<style></style>
