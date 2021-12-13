import jwt_decode from 'jwt-decode'

export default function ({ $api, $cookies, redirect }, inject) {
  const auth = {
    pathTo: '/panel',
    accessToken: '',
    user: null,
    loggedIn,
    init,
    login,
    logout
  }

  function loggedIn() {
    auth.accessToken = $cookies.get('accessToken')
    return !!$cookies.get('accessToken')
  }

  function init() {
    auth.accessToken = $cookies.get('accessToken')
    if (!!auth.accessToken) {
      const { exp, data: user } = jwt_decode($cookies.get('accessToken'))
      auth.exp = exp
      auth.user = user
    }
  }

  function login(payload) {
    return new Promise((reslove, reject) => {
      $api.app
        .login(payload)
        .then((res) => {
          const { accessToken } = res.data
          $cookies.set('accessToken', accessToken)
          auth.init()
          redirect(auth.pathTo)
          reslove(res.data)
        })
        .catch((error) => reject(error))
    })
  }

  function logout() {
    return new Promise((reslove, reject) => {
      $api.app
        .logout()
        .then((res) => {
          auth.init()
          reslove(res)
        })
        .catch((error) => reject(error))
    })
  }

  init()

  inject('auth', auth)
}
