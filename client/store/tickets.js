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
        const res = await this.$api.tickets.read({}, payload)
        await commit('SET_DATA', res.data)
        await resolve(res.data)
      } catch (error) {
        reject(error)
        this.$snack.error(error)
      }
      commit('SET_LOADING', false)
    })
  },

  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_LOADING', true)

      try {
        const res = await this.$api.tickets.create(payload)
        this.$snack.success('تیکت با موفقیت ثبت شد')
        resolve(res)
      } catch (error) {
        reject(error)
        this.$snack.error(error)
      }

      commit('SET_LOADING', false)
    })
  },

  delete({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_LOADING', true)

      try {
        const res = await this.$api.tickets.delete(payload)
        this.$snack.success('تیکت با موفقیت حذف شد')
        resolve(res)
      } catch (error) {
        reject(error)
        this.$snack.error(error)
      }

      commit('SET_LOADING', false)
    })
  },

  update({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_LOADING', true)

      try {
        const res = await this.$api.tickets.update(payload)
        this.$snack.success('تیکت با موفقیت ویرایش شد')
        resolve(res)
      } catch (error) {
        reject(error)
        this.$snack.error(error)
      }

      commit('SET_LOADING', false)
    })
  },
}
