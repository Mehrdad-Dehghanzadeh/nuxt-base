import Home from '@pages/home'
import Auth from '@pages/auth'

export const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/auth',
    component: Auth
  }
]

// Development Pages
import Uikit from '@pages/uikit'
export const devRoutes = [
  {
    path: '/uikit',
    component: Uikit
  }
]
