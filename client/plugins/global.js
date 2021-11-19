import Vue from 'vue'

import ClickOutside from '@directives/click-outside'
import LongClick from '@directives/long-click'

import VBtn from '@kits/VBtn/VBtn'
import VForm from '@kits/VForm/VForm'
import VInput from '@kits/VInput/Vinput'
import VDatePicker from '@kits/VDatePicker/VDatePicker'
import VSelect from '@kits/VSelect/VSelect'
import VSnackbar from '@kits/VSnackbar/VSnackbar'

/*
 * Global component registration
 ****************************/

const components = {
  VBtn,
  VForm,
  VInput,
  VDatePicker,
  VSelect,
  VSnackbar,
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
