import { gql } from '@apollo/client'

export const ALL_ORDERS = gql`
  query {
    allOrders {
      id
      address
      status
      date
    }
  }
`
