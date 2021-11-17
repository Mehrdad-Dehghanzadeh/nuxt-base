import Home from '@pages/home'
import Panel from '@pages/panel'
import Auth from '@pages/auth'

// Development Pages
import Uikit from '@pages/uikit'

export const routes = [
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

export const devRoutes = [
  {
    path: '/uikit',
    component: Uikit,
  },
]
