export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  login({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$auth.loginWith('local', { data: payload })
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
  },
}
