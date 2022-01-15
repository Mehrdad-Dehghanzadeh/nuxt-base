<template>
  <article class="panel-ticktes-page">
    <section class="card">
      <div class="btn-head-wrapper">
        <v-btn
          size="xs"
          color="success"
          icon="plus"
          @click="modal.create = true"
        >
          ثبت تیکت
        </v-btn>
      </div>
      <h1 class="heading-2 text-center">تیکت ها</h1>
      <hr class="divider" />

      <!-- data table -->
      <div class="mt-35">
        <v-data-table
          ref="table"
          :headers="headers"
          resource="tickets"
          centered
          paging
        >
          <template v-slot:item.status="{ item }">
            <v-chip
              :success="item.status === 'answered'"
              :error="item.status === 'closed'"
              :info="item.status === 'pending'"
            >
              {{ $u.enums('ticketStatus', item.status).title }}
            </v-chip>
          </template>

          <template v-slot:item.received="{ item }">
            {{ item.received | date() }}
          </template>

          <template v-slot:item.operation="{ item }" }>
            <v-menu>
              <v-menu-item @click="showMessages(item.id)">
                <i class="icon-message-square"></i>
                <span>جواب ها</span>
              </v-menu-item>

              <v-menu-item @click="showUpdate(item)">
                <i class="icon-edit"></i>
                <span>ویرایش</span>
              </v-menu-item>

              <v-menu-item @click="deleteTicket(item)">
                <i class="icon-trash-2"></i>
                <span>حذف</span>
              </v-menu-item>
            </v-menu>
          </template>
        </v-data-table>
      </div>
    </section>
    <!-- data table -->

    <!-- create ticket modal -->
    <v-modal size="xs" v-model="modal.create" title="ثبت تیکت">
      <p-create />
    </v-modal>
    <!-- create ticket modal -->

    <!-- edit ticket modal -->
    <v-modal v-model="modal.edit" title="ویرایش تیکت">
      <p-edit :item="tempItem" @updateTicket="updateTicket()" />
    </v-modal>
    <!-- edit ticket modal -->

    <!--  message modal -->
    <v-modal size="lg" v-model="modal.message" title="جواب ها">
      <p-message :ticketID="ticketID" />
    </v-modal>
    <!--  message modal -->
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VDataTable from '@kits/VDataTable/VDataTable'
import VMenu from '@kits/VMenu/VMenu'
import VMenuItem from '@kits/VMenu/VMenuItem'
import VChip from '@kits/VChip/VChip.vue'
import VModal from '@kits/VModal/VModal'
import PCreate from './_partial.create'
import PEdit from './_partial.edit'
import PMessage from './_partial.message'

export default {
  name: 'PanelTicketsPage',
  components: {
    VDataTable,
    VMenu,
    VMenuItem,
    VChip,
    VModal,
    PCreate,
    PEdit,
    PMessage
  },

  head() {
    return {
      title: 'پنل ادمین | تیک ها '
    }
  },

  data() {
    return {
      modal: {
        create: false,
        message: false,
        edit: false
      },
      tempItem: null,
      ticketID: 0,

      headers: [
        { title: 'شناسه', value: 'id' },
        { title: 'عنوان', value: 'title' },
        { title: 'تاریخ دریافت', value: 'received' },
        { title: 'وضیعت', value: 'status' },
        { title: 'پیام', value: 'message' },
        { title: 'عملیات', value: 'operation' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      answerLoading: 'answers/getLoading'
    })
  },

  methods: {
    ...mapActions({
      create: 'tickets/create',
      delete: 'tickets/delete'
    }),

    async deleteTicket({ id }) {
      try {
        await this.delete(id)
        await this.$refs.table.read()
      } catch (error) {
        this.$snack.error(error)
      }
    },

    showUpdate(item) {
      this.tempItem = item
      this.modal.edit = true
    },

    async showMessages(id) {
      this.$nuxt.loading = this.answerLoading
      await this.$store.dispatch('answers/read', id)
      this.ticketID = id
      this.modal.message = true
    },

    updateTicket() {
      this.modal.edit = false
      this.$refs.table.read()
    }
  }
}
</script>

<style></style>
