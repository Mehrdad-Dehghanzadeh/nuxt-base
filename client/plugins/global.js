import Vue from 'vue'

import VBtn from '@kits/VBtn/VBtn'
import VForm from '@kits/VForm/VForm'
import VInput from '@kits/VInput/Vinput'

const components = {
  VBtn,
  VForm,
  VInput,
}

/*
 * Global component registration
 ****************************/
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
