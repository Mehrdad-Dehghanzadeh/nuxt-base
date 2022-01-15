<template>
  <section class="v-ticket">
    <a class="v-ticket__link" :href="link" :title="`تیکت ${ticket.title}`">
      <h3 class="heading-4 fg-success text-center py-5">{{ ticket.title }}</h3>
      <hr class="divider" />
      <div class="body-2">
        <ul>
          <li class="v-ticket__item">
            <span class="v-ticket__title">شناسه</span>
            <span class="v-ticket__text">{{ ticket.id }}</span>
          </li>

          <li class="v-ticket__item">
            <span class="v-ticket__title"> تاریخ دریافت </span>
            <span class="v-ticket__text">{{ ticket.received | date() }}</span>
          </li>

          <li class="v-ticket__item">
            <span class="v-ticket__title"> وضیعت </span>
            <span
              :class="[
                'v-ticket__text',
                `fg-${$u.enums('ticketStatus', ticket.status).color}`
              ]"
            >
              {{ $u.enums('ticketStatus', ticket.status).title }}
            </span>
          </li>
        </ul>

        <p class="subtitle-2 text-center fg-success my-10">متن</p>
        <p class="body-2">{{ ticket.message }}</p>
      </div>
    </a>
  </section>
</template>

<script>
import { encode } from '@helpers/utils'

export default {
  name: 'VTicket',

  props: {
    ticket: {
      type: Object,
      required: true
    }
  },

  computed: {
    link() {
      return `tickets/${encode(this.ticket.id.toString())}`
    }
  }
}
</script>

<style lang="scss" src="./VTicket.scss" />
