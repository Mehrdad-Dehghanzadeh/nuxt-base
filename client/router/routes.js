import Home from '@pages/home'
import Panel from '@pages/panel'
import Auth from '@pages/auth'

export default [
  {
    path: '/',
    component: Home,
  },

  {
    path: '/auth',
    component: Auth,
  },

  {
    path: '/panel',
    component: Panel,
  },
]
