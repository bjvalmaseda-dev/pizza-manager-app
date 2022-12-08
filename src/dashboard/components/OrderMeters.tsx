import { useOrders } from '../../hooks/useOrders'
import { Spin } from './Spin'

export const OrderMeters = () => {
  const { data } = useOrders()

  if (data === null) return null

  return (
    <>
      <div className='h-full text-center text-gray-800'>
        <h1 className='uppercase font-semibold '>delivered status</h1>
        <div>
          <p>Total Orders</p>
          <span className='font-extrabold text-2xl text'>
            {data?.allOrders.length}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <div>
            <Spin total={600} part={50} colorClass='text-green-500' />
            <span>Orders delivered</span>
          </div>
          <div>
            <Spin total={600} part={565} colorClass='text-red-500' />
            <span>Pending delivery</span>
          </div>
        </div>
      </div>
    </>
  )
}
