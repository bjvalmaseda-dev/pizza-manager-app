export as namespace myLib
export interface Pizza {
  size: Size
  price: number
  toppings: Topping[]
  totalPrice: number
}

export interface Topping {
  name: string
  price: number
}

export interface Order {
  id
  name: string
  address: string
  date: string
  email: string
  phone: string
  products: Pizza[]
  total: number
  status: Status
}

export type Size = 'large' | 'medium' | 'small'

export type OrderDto = Omit<Order, 'id'>

export type Status = 'ACCEPTED' | 'COMPLETED' | 'PENDING' | 'CANCELLED'
