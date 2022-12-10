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
      name
      products {
        size
        price
        totalPrice
        toppings {
          name
          price
        }
      }
      address
      status
      date
      total
    }
  }
`
