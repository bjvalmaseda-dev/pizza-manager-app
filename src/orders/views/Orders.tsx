import { OrderList } from '../components/OrderList'
import { useOrders } from '../../hooks/useOrders'
import { useSubscription } from '@apollo/client'
import { ORDER_UPDATED } from '../graphql-subscriptions'
import { ALL_ORDERS } from '../graphql-queries'
import { Order } from '../../type'

const useSubscriptions = (): void => {
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
}

export const Orders = () => {
  const { error, data, loading } = useOrders()

  useSubscriptions()

  if (error != null) return <span>{error.message}</span>
  console.log(data)

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <span className='text-sm text-gray-500'>
            Total items in inventory
          </span>
        </div>
        <div>
          <button className='text-xs px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'>
            Print summary
          </button>
        </div>
      </div>
      <div className='mt-4 border-t border-gray-300 flex items-start gap-6 text-gray-800 text-xs py-6'>
        <div className='flex items-center space-x-4'>
          <div className='rounded-full bg-green-600 w-3 h-3'></div>
          <div>
            <p>Completed</p>
            <span className='text-gray-500'>300</span>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='rounded-full bg-blue-600 w-3 h-3'></div>
          <div>
            <p>Pending</p>
            <span className='text-gray-500'>300</span>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='rounded-full bg-rose-500 w-3 h-3'></div>
          <div>
            <p>Cancelled</p>
            <span className='text-gray-500'>300</span>
          </div>
        </div>
      </div>
      {loading ? <p>Loading</p> : <OrderList orders={data.allOrders} />}
    </div>
  )
}
