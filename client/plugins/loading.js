import Vue from 'vue'
import component from '@kits/KLoading/KLoading'

export default function ({}, inject) {
  const loading = new Vue(component).$mount()
  document.body.appendChild(loading.$el)

  inject('kLoading', loading)
}
