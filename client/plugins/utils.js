import fa from '~/locales/fa'
import allEnums from '~/locales/enums'

function enums(prop) {
  const items = prop.split('.')
  return allEnums[items[0]][items[1]]
}
export default ({}, inject) => {
  const utils = {
    appName: fa.App.name,
    enums,
  }

  inject('u', utils)
}
