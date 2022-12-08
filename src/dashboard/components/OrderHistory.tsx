import { LineChart } from './LineChart'

export const OrderHistory = () => {
  return (
    <div className='flex flex-col items-center border-r border-gray-300 pr-2'>
      <h1 className='uppercase mb-4'>Order History</h1>
      <LineChart />
    </div>
  )
}
