import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/home'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home,
      },
    ],
  })
}
