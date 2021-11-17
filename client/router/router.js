import Vue from 'vue'
import Router from 'vue-router'
import { routes, devRoutes } from './routes'

Vue.use(Router)
export function createRouter() {
  const isDev = process.env.NODE_ENV == 'development'

  return new Router({
    mode: 'history',
    routes: isDev ? [...routes, ...devRoutes] : routes,
  })
}
