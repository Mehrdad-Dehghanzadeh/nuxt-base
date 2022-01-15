import fa from '~/locales/fa'
import { enumProvider } from '@helpers/utils'

export default ({}, inject) => {
  const utils = {
    appName: fa.app.name,

    enums: enumProvider
  }

  inject('u', utils)
}
