import { OrderList } from '../components/OrderList'
import { useOrders } from '../../hooks/useOrders'

export const Orders = () => {
  const { error, data, loading, delivered, pending, cancelled, orders } =
    useOrders()

  if (error != null) return <span>{error.message}</span>
  console.log(data)

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <span className='text-sm text-gray-500'>
            Total items in inventory
            <div className='mt-2'>
              <span className='text-blue-500 text-2xl mr-1'>
                {orders.length}
              </span>
              <span className='text-sm text-gray-400'>items</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 flex'>
              <div
                className={`bg-green-500 h-2 rounded-l-full`}
                style={{
                  width: `${(delivered.length / orders?.length) * 100}%`,
                }}
              ></div>
              <div
                className={`bg-blue-500 h-2`}
                style={{ width: `${(pending.length / orders?.length) * 100}%` }}
              ></div>
              <div
                className={`bg-pink-500 h-2 rounded-r-full `}
                style={{
                  width: `${(cancelled.length / orders?.length) * 100}%`,
                }}
              ></div>
            </div>
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
            <span className='text-gray-500'>{delivered.length}</span>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='rounded-full bg-blue-600 w-3 h-3'></div>
          <div>
            <p>Pending</p>
            <span className='text-gray-500'>{pending.length}</span>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='rounded-full bg-rose-500 w-3 h-3'></div>
          <div>
            <p>Cancelled</p>
            <span className='text-gray-500'>{cancelled.length}</span>
          </div>
        </div>
      </div>
      {loading ? <p>Loading</p> : <OrderList orders={data.allOrders} />}
    </div>
  )
}
