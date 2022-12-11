import { useOrders } from '../../hooks/useOrders'
import { Spin } from './Spin'

export const OrderMeters = () => {
  const { orders, delivered, pending } = useOrders()

  return (
    <>
      <div className='h-full text-center text-gray-800'>
        <h1 className='uppercase font-semibold '>delivered status</h1>
        <div>
          <p>Total Orders</p>
          <span className='font-extrabold text-2xl text'>{orders.length}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <div>
            <Spin
              total={orders.length}
              part={delivered.length}
              colorClass='text-green-500'
            />
            <span>Orders delivered</span>
          </div>
          <div>
            <Spin
              total={orders.length}
              part={pending.length}
              colorClass='text-red-500'
            />
            <span>Pending delivery</span>
          </div>
        </div>
      </div>
    </>
  )
}
