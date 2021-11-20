import Vue from 'vue'

import ClickOutside from '@directives/click-outside'
import LongClick from '@directives/long-click'

import VBtn from '@kits/VBtn/VBtn'
import VForm from '@kits/VForm/VForm'
import VInput from '@kits/VInput/Vinput'
import VSelect from '@kits/VSelect/VSelect'
import VSnackbar from '@kits/VSnackbar/VSnackbar'
import VTextarea from '@kits/VTextarea/VTextarea'

/*
 * Global component registration
 ****************************/

const components = {
  VBtn,
  VForm,
  VInput,
  VSelect,
  VSnackbar,
  VTextarea,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

/*
 * Global directives registration
 ****************************/

const directives = {
  ClickOutside,
  LongClick,
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
  hiddenMask,
} from '@helpers/filters'

const filters = {
  round,
  price,
  creditCard,
  fullPath,
  fileSize,
  date,
  hiddenMask,
}

Object.entries(filters).forEach(([name, filter]) => {
  Vue.filter(name, filter)
})
