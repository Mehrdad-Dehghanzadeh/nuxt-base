export const state = () => ({
  data: [],
  loading: false,
})

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

export const getters = {
  getData(state) {
    return state.data
  },

  getLoading(state) {
    return state.loading
  },
}

export const actions = {
  read({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_LOADING', true)

      try {
        const res = await this.$api.answers.read(payload)
        await commit('SET_DATA', res.data)
        await resolve(res.data)
      } catch (error) {
        reject(error)
      }

      commit('SET_LOADING', false)
    })
  },

  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_LOADING', false)

      try {
        const res = await this.$api.answers.create(payload)
        this.$snack.success('جواب با موفقیت ارسال شد')
        resolve(res)
      } catch (error) {
        reject(error)
      }

      commit('SET_LOADING', false)
    })
  },
}
