import fa from '~/locales/fa'

export default ({}, inject) => {
  const utils = {
    appName: fa.app.name,
  }

  inject('u', utils)
}
