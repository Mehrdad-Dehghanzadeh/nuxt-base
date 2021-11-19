import Vue from 'vue'

import ClickOutside from '@directives/click-outside'

import VBtn from '@kits/VBtn/VBtn'
import VForm from '@kits/VForm/VForm'
import VInput from '@kits/VInput/Vinput'
import VDatePicker from '@kits/VDatePicker/VDatePicker'
import VSelect from '@kits/VSelect/VSelect'

/*
 * Global component registration
 ****************************/

const components = {
  VBtn,
  VForm,
  VInput,
  VDatePicker,
  VSelect,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

/*
 * Global directives registration
 ****************************/

const directives = {
  ClickOutside,
}

Object.entries(directives).forEach(([name, component]) => {
  Vue.directive(name, component)
})
