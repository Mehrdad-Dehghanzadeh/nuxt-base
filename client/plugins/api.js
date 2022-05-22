import appApi from '@api/app'

export default ({ $axios }, inject) => {
  const api = {
    app: appApi($axios)
  }

  inject('api', api)
}
