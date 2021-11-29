<template>
  <article class="auth-page">
    <v-form class="auth-form" id="auth-form" @onValid="login">
      <h2 class="heading-4 mb-25 text-center">ورود</h2>

      <div class="pb-15">
        <v-input v-model="model.username" label="نام کاربری" required />
      </div>

      <div class="pb-15">
        <v-input
          v-model="model.password"
          label="گذرواژه"
          type="password"
          rules="min_value:6"
          required
        />
      </div>

      <div class="text-center">
        <v-btn
          :loading="loading"
          type="submit"
          size="xs"
          text="ورود"
          color="secondary"
          icon="log-in"
        />
      </div>
    </v-form>
  </article>
</template>

<script>
export default {
  name: 'AuthPage',

  head() {
    return {
      title: 'ورود / عضویت',
    }
  },

  data() {
    return {
      loading: false,
      model: {
        username: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      await this.$store.dispatch('app/login', this.model)
    },
  },
}
</script>

<style lang="scss" src="./style.scss" />
