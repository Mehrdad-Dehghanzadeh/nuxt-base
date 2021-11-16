import restApi from '@api/restApi'

export default ({ $axios }, inject) => {
  const api = {
    // resource: restApi($axios, 'resource')
  }

  inject('api', api)
}
