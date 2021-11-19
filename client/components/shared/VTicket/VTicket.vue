<template>
  <section class="v-ticket">
    <nuxt-link class="v-ticket__link" to="ticket/:id" title="تیکت">
      <h3 class="heading-4 fg-success text-center py-5">title</h3>
      <hr class="divider" />
      <div class="body-2">
        <ul>
          <li class="v-ticket__item">
            <span class="v-ticket__title">شناسه</span>
            <span class="v-ticket__text">7</span>
          </li>

          <li class="v-ticket__item">
            <span class="v-ticket__title"> تاریخ دریافت </span>
            <span class="v-ticket__text">1399/06/12</span>
          </li>

          <li class="v-ticket__item">
            <span class="v-ticket__title"> وضیعت </span>
            <span class="v-ticket__text">بسته</span>
          </li>
        </ul>

        <p class="subtitle-2 text-center fg-success my-10">متن</p>
        <p class="body-2">asdasdasdsadsadasdasd</p>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'VTicket',
}
</script>

<style lang="scss" src="./VTicket.scss" />
