import { useQuery } from '@apollo/client'
import { ALL_ORDERS } from '../orders/graphql-queries'

export const useOrders = () => {
  const result = useQuery(ALL_ORDERS)
  return result
}
