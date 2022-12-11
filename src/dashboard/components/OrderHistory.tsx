import { useOrders } from '../../hooks/useOrders'
import { LineChart } from './LineChart'

export const OrderHistory = () => {
  const { resume } = useOrders()

  const labels = Array(24)
    .fill('')
    .map((_, index) => (index < 10 ? `0${index}` : `${index}`))

  const data = Array(24).fill(0)

  resume.forEach(item => {
    data[Number(item[0])] = item[1]
  })

  return (
    <div className='flex flex-col items-center '>
      <h1 className='uppercase mb-4 text-gray-800'>Order History</h1>
      <LineChart data={{ labels, data }} />
    </div>
  )
}
