export default ($axios, resource) => ({
  create(payload) {
    return $axios.post(`/${resource}`, payload)
  },
  read(query, id) {
    const payload = query ? { params: query } : {}
    return $axios.get(`/${resource}${id ? `/${id}` : ''}`, payload)
  },
  update(payload) {
    return $axios.put(`/${resource}/${payload.id}`, payload)
  },
  delete(id) {
    return $axios.delete(`/${resource}/${id}`)
  },
})
