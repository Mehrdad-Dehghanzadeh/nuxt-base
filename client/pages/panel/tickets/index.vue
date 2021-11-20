<template>
  <article class="panel-ticktes-page">
    <section class="card">
      <div class="btn-head-wrapper">
        <v-btn size="xs" color="success" icon="plus">ثبت تیکت</v-btn>
      </div>
      <h1 class="heading-2 text-center">تیکت ها</h1>
      <hr class="divider" />

      <div class="mt-35">
        <v-data-table
          ref="table"
          :headers="headers"
          resource="tickets"
          centered
        >
          <template v-slot:item.status="{ item }">
            {{ $u.enums(`ticketStatus.${item.status}`) }}
          </template>

          <template v-slot:item.received="{ item }">
            {{ item.received | date() }}
          </template>

          <template v-slot:item.operation="{ item }" }>
            <v-menu>
              <v-menu-item>
                <i class="icon-message-square"></i>
                <span>جواب ها</span>
              </v-menu-item>

              <v-menu-item @click="updateTicket(item)">
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
  </article>
</template>

<script>
import { mapActions } from 'vuex'
import VDataTable from '@kits/VDataTable/VDataTable'
import VMenu from '@kits/VMenu/VMenu'
import VMenuItem from '@kits/VMenu/VMenuItem'

export default {
  name: 'PanelTicketsPage',
  components: { VDataTable, VMenu, VMenuItem },

  data() {
    return {
      headers: [
        { title: 'شناسه', value: 'id' },
        { title: 'عنوان', value: 'title' },
        { title: 'تاریخ دریافت', value: 'received' },
        { title: 'وضیعت', value: 'status' },
        { title: 'پیام', value: 'message' },
        { title: 'عملیات', value: 'operation' },
      ],
    }
  },

  methods: {
    ...mapActions({
      create: 'tickets/create',
      delete: 'tickets/delete',
    }),

    async deleteTicket({ id }) {
      try {
        await this.delete(id)
        await this.$refs.table.read()
      } catch (error) {
        this.$snack.error(error)
      }
    },
  },
}
</script>

<style></style>
