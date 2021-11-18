import Vue from 'vue'

import VBtn from '@kits/VBtn/VBtn'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

const components = {
  ValidationObserver,
  ValidationProvider,
  VBtn,
}

/*
 * Global component registration
 ****************************/
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
