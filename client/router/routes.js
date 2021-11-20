import Home from '@pages/home'
import Panel from '@pages/panel'
import Auth from '@pages/auth'
import Tickets from '@pages/tickets'
import TicketsDetails from '@pages/tickets/_id'

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
    component: Tickets,
  },

  {
    path: '/tickets/:id',
    component: TicketsDetails,
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
