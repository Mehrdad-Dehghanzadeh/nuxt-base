import restApi from '@api/restApi'
import appApi from '@api/app'
import answersApi from '@api/answers'

export default ({ $axios }, inject) => {
  const api = {
    app: appApi($axios),
    tickets: restApi($axios, 'tickets'),
    answers: answersApi($axios),
  }

  inject('api', api)
}
