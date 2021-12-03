export const state = () => ({
})

export const getters = {}

export const mutations = {

}

export const actions = {
  async nuxtServerInit({ }, { $auth }) {
    if ($auth.loggedIn) {}
  }
}
