import Home from '@pages/home'
import Auth from '@pages/auth'
import Tickets from '@pages/tickets'
import TicketsDetails from '@pages/tickets/_id'

import Panel from '@pages/panel'
import PanelTickets from '@pages/panel/tickets'

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
    path: '/tickets',
    component: Tickets,
  },

  {
    path: '/tickets/:id',
    component: TicketsDetails,
  },

  {
    path: '/panel',
    component: Panel,
    children: [
      {
        path: 'tickets',
        component: PanelTickets,
      },
    ],
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
