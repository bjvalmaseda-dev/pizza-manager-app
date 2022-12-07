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
  name: string
  address: string
  email: string
  phone: string
  products: Pizza[]
  total: number
}

export type Size = 'large' | 'medium' | 'small'
