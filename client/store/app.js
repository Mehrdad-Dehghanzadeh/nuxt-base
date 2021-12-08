export const state = () => ({
  token: null,
  user: null
})

export const getters = {}

export const mutations = {}

export const actions = {
  login({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$auth.login(payload)
        resolve(res)
      } catch (error) {
        reject(error)
        this.$snack.error(error.message)
      }
    })
  },

  logout({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$auth.logout(payload)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}
