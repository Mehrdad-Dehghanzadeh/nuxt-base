import fa from '~/locales/fa'

export default ({}, inject) => {
  const utils = {
    appName: fa.App.name,
  }

  inject('u', utils)
}
