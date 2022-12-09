/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useQuery } from '@apollo/client'
import { ALL_ORDERS } from '../orders/graphql-queries'
import { Order, Status } from '../type'
import moment from 'moment'

export const useOrders = () => {
  const { data, error, loading } = useQuery(ALL_ORDERS)

  const filterByStatus = (status: Status): Order[] => {
    if (!data?.allOrders) return []
    return data.allOrders.filter((order: Order) => order.status === status)
  }

  const orders: Order[] = data?.allOrders ?? []
  const pending = filterByStatus('PENDING')
  const delivered = filterByStatus('COMPLETED')
  const cancelled = filterByStatus('CANCELLED')
  const totalSales = delivered.reduce((sum, order) => sum + order.total, 0)

  type ResumeType = Record<string, number>
  const resume = Object.entries<number>(
    orders
      .filter(item => moment(item.date).isSame(moment(), 'day'))
      .reduce<ResumeType>((acc, item) => {
        const key = moment(item.date).hour()
        acc[key] = acc[key] ? acc[key] + 1 : 1
        return acc
      }, {})
  )

  return {
    data,
    error,
    loading,
    delivered,
    orders,
    pending,
    cancelled,
    totalSales,
    resume,
  }
}
