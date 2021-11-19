import Home from '@pages/home'
import Panel from '@pages/panel'
import Auth from '@pages/auth'
import Tickest from '@pages/tickets'

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

  {
    path: '/tickets',
    component: Tickest,
  },
]

// Development Pages
import Uikit from '@pages/uikit'
export const devRoutes = [
  {
    path: '/uikit',
    component: Uikit,
  },
]
