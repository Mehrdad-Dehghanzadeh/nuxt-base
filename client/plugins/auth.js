export default function ({  }, inject) {
  const auth = {
    loggedIn: false,
    token: ''
  }

  inject('auth', auth)
}
