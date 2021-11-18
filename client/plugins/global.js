import Vue from 'vue'

import VBtn from '@kits/VBtn/VBtn'
import VForm from '@kits/VForm/VForm'
import VInput from '@kits/VInput/Vinput'
import VDatePicker from '@kits/VDatePicker/VDatePicker'

const components = {
  VBtn,
  VForm,
  VInput,
  VDatePicker,
}

/*
 * Global component registration
 ****************************/
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
