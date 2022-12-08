import { gql } from '@apollo/client'

export const ORDER_UPDATED = gql`
  subscription {
    orderUpdated {
      id
      status
    }
  }
`
