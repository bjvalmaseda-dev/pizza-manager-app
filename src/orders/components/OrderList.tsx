import { useMutation } from '@apollo/client'
import { Order, Status } from '../../type'
import { humanDiffDate } from '../../utils'
import { CHANGE_ORDER_STATUS } from '../graphql-mutations'

interface Props {
  orders: Order[]
}

export const OrderList = ({ orders }: Props) => {
  const [updateStatus] = useMutation(CHANGE_ORDER_STATUS, {
    onError: error => {
      console.log(error)
    },
  })
  const handleChangeStatus = (id: string, status: Status) => {
    updateStatus({ variables: { id, status } }).catch(error =>
      console.log(error)
    )
  }
  return (
    <table className='min-w-full text-xs border-t'>
      <thead className='bg-gray-100 border-b'>
        <tr>
          <th
            scope='col'
            className='font-medium text-gray-500 px-6 py-2 text-left'
          >
            Item ID
          </th>
          <th
            scope='col'
            className='font-medium text-gray-500 px-6 py-2 text-left'
          >
            Address
          </th>
          <th
            scope='col'
            className='font-medium text-gray-500 px-6 py-2 text-left'
          >
            Order Time
          </th>
          <th
            scope='col'
            className='font-medium text-gray-500 px-6 py-2 text-left'
          >
            Status/ Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr className='bg-gray-100 odd:bg-white' key={order.id}>
            <td className='px-6 py-2 whitespace-nowrap  text-gray-900'>1</td>
            <td className='text-gray-900 font-light px-6 py-2 whitespace-nowrap'>
              {order.address}
            </td>
            <td className='text-gray-900 font-light px-6 py-2 whitespace-nowrap'>
              {humanDiffDate(new Date(order.date))}
            </td>
            <td className='text-gray-900 font-light px-6 py-2 whitespace-nowrap'>
              {order.status === 'PENDING' && (
                <>
                  <span
                    className='text-green-600 hover:underline cursor-pointer mr-3'
                    onClick={() => handleChangeStatus(order.id, 'ACCEPTED')}
                  >
                    Accept
                  </span>
                  <span
                    className='text-rose-600 hover:underline cursor-pointer'
                    onClick={() => handleChangeStatus(order.id, 'CANCELLED')}
                  >
                    Cancel
                  </span>
                </>
              )}
              {order.status === 'ACCEPTED' && (
                <>
                  <span className='mr-3'>Accepted</span>
                  <span
                    className='text-blue-600 hover:underline cursor-pointer'
                    onClick={() => handleChangeStatus(order.id, 'COMPLETED')}
                  >
                    Mark as Completed
                  </span>
                </>
              )}
              {order.status === 'CANCELLED' && (
                <span className='text-rose-600'>Cancelled</span>
              )}
              {order.status === 'COMPLETED' && <span>Completed</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
