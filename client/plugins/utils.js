import { enumProvider, translatorPorvider } from '@helpers/utils'

export default ({}, inject) => {
  const utils = {
    appName: translatorPorvider('app.name'),

    enums: enumProvider,
    translate: translatorPorvider
  }

  inject('u', utils)
}
