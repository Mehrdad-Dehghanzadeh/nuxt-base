import { enumProvider } from '@helpers/utils'

export default ({}, inject) => {
  const utils = {
    enums: enumProvider
  }

  inject('u', utils)
}
