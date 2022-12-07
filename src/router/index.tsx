import { createBrowserRouter, Navigate } from 'react-router-dom'
import { NewOrder } from '../orders/views'
import PizzaApp from '../PizzaApp'

export const router = createBrowserRouter([
  {
    path: '/orders',
    element: <PizzaApp />,
    children: [
      { path: 'new', element: <NewOrder /> },
      { path: 'manage', element: <div>Manage order</div> },
      { path: 'dashboard', element: <div>Dashboard</div> },
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
