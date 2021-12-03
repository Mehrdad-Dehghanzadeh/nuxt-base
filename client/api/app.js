export default ($axios) => ({
  login(payload) {
    return $axios.post('/auth/login', payload)
  },

  logout(payload) {
    return $axios.post('/auth/logout', payload)
  },

  signIn(payload) {
    return $axios.post('/auth/sign-in', payload)
  },
})
