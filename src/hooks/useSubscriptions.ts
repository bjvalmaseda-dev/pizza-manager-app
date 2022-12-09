import { useSubscription } from '@apollo/client'
import { ALL_ORDERS } from '../orders/graphql-queries'
import { ORDER_ADDED, ORDER_UPDATED } from '../orders/graphql-subscriptions'
import { Order } from '../type'

export const useSubscriptions = (): void => {
  useSubscription(ORDER_UPDATED, {
    onData: ({ data, client }) => {
      const { id, status } = data.data
      const dataInStore = client.readQuery({ query: ALL_ORDERS })
      client.writeQuery({
        query: ALL_ORDERS,
        data: {
          ...dataInStore,
          allPersons: dataInStore.allOrders.map((order: Order) =>
            order.id === id ? { ...order, status } : order
          ),
        },
      })
    },
  })

  useSubscription(ORDER_ADDED, {
    onData: ({ data, client }) => {
      const order = data.data
      const dataInStore = client.readQuery({ query: ALL_ORDERS })
      client.writeQuery({
        query: ALL_ORDERS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allOrders, order],
        },
      })
    },
  })
}
