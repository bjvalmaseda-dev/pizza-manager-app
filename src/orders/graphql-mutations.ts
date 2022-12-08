import { gql } from '@apollo/client'

export const ADD_ORDER = gql`
  mutation addOrder(
    $name: String!
    $address: String!
    $phone: String!
    $email: String!
    $products: [PizzaInput]!
    $total: Float!
  ) {
    addOrder(
      name: $name
      address: $address
      phone: $phone
      email: $email
      products: $products
      total: $total
    ) {
      name
      date
    }
  }
`
export const CHANGE_ORDER_STATUS = gql`
  mutation ($id: ID!, $status: Status!) {
    changeOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`
