export default ({ $auth }, inject) => {
  $auth.onError((error, name, endpoint) => {
    console.error(name, error)
  })

  inject('auth', $auth)
}
