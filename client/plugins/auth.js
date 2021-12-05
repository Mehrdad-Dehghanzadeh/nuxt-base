export default function ({ $api }, inject) {
  const auth = {
    loggedIn: false,
    token: '',
  }

  inject('auth', auth)
}
