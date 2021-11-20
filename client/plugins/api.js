import restApi from '@api/restApi'
import answersApi from '@api/answers'

export default ({ $axios }, inject) => {
  const api = {
    tickets: restApi($axios, 'tickets'),
    answers: answersApi($axios),
  }

  inject('api', api)
}
