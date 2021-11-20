export const state = () => ({
  data: [],
})

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },
}

export const getters = {
  getData(state) {
    return state.data
  },
}

export const actions = {
  read({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$api.answers.read(payload)
        await commit('SET_DATA', res.data)
        await resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },

  create({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$api.answers.create(payload)
        this.$snack.success('جواب با موفقیت ارسال شد')
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  },
}
