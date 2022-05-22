import Vue from 'vue'
import component from '@kits/KSnackbar/KSnackbar'

let snack = null

const defaults = {
  type: '',
  time: 5000,
}

const types = ['success', 'info', 'error', 'alert']

function show(text, options) {
  snack.appear({ text, ...defaults, ...options })
}

function registerTypes() {
  const methods = {}

  types.forEach((type) => {
    methods[type] = (text, options) => show(text, { type, ...options })
  })

  return methods
}

export default ({}, inject) => {
  snack = new Vue(component).$mount()
  document.body.appendChild(snack.$el)

  inject(
    'snack',
    Object.assign(show, {
      ...registerTypes(),
    })
  )
}
