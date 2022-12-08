import { createBrowserRouter, Navigate } from 'react-router-dom'
import { NewOrder } from '../orders/views'
import { Orders } from '../orders/views/Orders'
import { Dashboard } from '../dashboard/view/Dashboard'
import PizzaApp from '../PizzaApp'

export const router = createBrowserRouter([
  {
    path: '/orders',
    element: <PizzaApp />,
    children: [
      { path: 'new', element: <NewOrder /> },
      { path: 'manage', element: <Orders /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to='orders/new' />,
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
])
