import restApi from '@api/restApi'

export default ({ $axios }, inject) => {
  // create instance of resApi
  const createRestApi = restApi($axios)

  const api = {}

  inject('api', api)
}
