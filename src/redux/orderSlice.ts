import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person, Pizza } from '../type'

export interface SliceType {
  name: string
  email: string
  address: string
  phone: string
  products: Pizza[]
  total: number
}

const initialState: SliceType = {
  name: '',
  address: '',
  phone: '',
  email: '',
  products: [{ size: 'large', price: 25.0, toppings: [], totalPrice: 25.0 }],
  total: 25.0,
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderData: (state, action: PayloadAction<Person>) => {
      state = { ...state, ...action.payload }
    },
    addPizza: (state, action: PayloadAction<Pizza>) => {
      state.products.push(action.payload)
      state.total = state.total + action.payload.totalPrice
    },
    removePizza: (state, action: PayloadAction<number>) => {
      const products = state.products.filter(
        (_, index) => index !== action.payload
      )
      state.products = products
      state.total = products.reduce((sum, pizza) => {
        return (sum += pizza.totalPrice)
      }, 0)
    },

    updatePizza: (
      state,
      action: PayloadAction<{ pizza: Pizza; index: number }>
    ) => {
      state.products[action.payload.index] = action.payload.pizza
      state.total = state.products.reduce((sum, pizza) => {
        return (sum += pizza.totalPrice)
      }, 0)
    },

    reset: state => {
      state = initialState
    },
  },
})

export const { addPizza, removePizza, addOrderData, updatePizza, reset } =
  orderSlice.actions

export default orderSlice.reducer
