import { gql } from '@apollo/client'

export const ORDER_UPDATED = gql`
  subscription {
    orderUpdated {
      id
      status
    }
  }
`
export const ORDER_ADDED = gql`
  subscription {
    orderAdded {
      id
      address
      status
      date
      total
    }
  }
`
