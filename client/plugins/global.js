import Vue from 'vue'

import VBtn from '@kits/VBtn/VBtn'

const components = {
  VBtn,
}

/*
 * Global component registration
 ****************************/
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
