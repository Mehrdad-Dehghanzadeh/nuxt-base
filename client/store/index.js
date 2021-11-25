export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({}, { $auth }) {
    console.log($auth)
  },
}
