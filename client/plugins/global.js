import Vue from 'vue'

/*
 * Global component registration in Kits Directory
 ********************************************/
const requireComponent = require.context(
  // The relative path of the components folder
  '../components/kits',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue)$/)

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

/*
 * Global directives registration
 ****************************/
import ClickOutside from '@directives/click-outside'
import LongClick from '@directives/long-click'

const directives = {
  ClickOutside,
  LongClick
}

Object.entries(directives).forEach(([name, component]) => {
  Vue.directive(name, component)
})

/*
 * Global filter registration
 ****************************/
import {
  round,
  price,
  creditCard,
  fullPath,
  fileSize,
  date,
  hiddenMask
} from '@helpers/filters'

const filters = {
  round,
  price,
  creditCard,
  fullPath,
  fileSize,
  date,
  hiddenMask
}

Object.entries(filters).forEach(([name, filter]) => {
  Vue.filter(name, filter)
})
