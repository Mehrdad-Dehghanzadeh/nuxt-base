export default ($axios) => ({
  create(payload) {
    return $axios.post('/answers', payload)
  },

  read(ticketID) {
    return $axios.get(`/answers/${ticketID}`)
  },
})
