import { useOrders } from '../../hooks/useOrders'

export const Sales = () => {
  const { totalSales } = useOrders()
  return (
    <div className='flex items-center flex-col justify-center  text-gray-700'>
      <h1 className='uppercase text-2xl font-bold'>TOTAL SALES</h1>
      <span>USD</span>
      <p className='text-4xl font-extrabold mt-4'>{totalSales}</p>
    </div>
  )
}
