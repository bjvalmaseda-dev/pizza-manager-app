import { useReducer } from 'react'
import { Pizza } from '../type'

const INITIAL_STATE = {
  pizzas: [],
}

interface State {
  pizzas: Pizza[]
}
type ReducerAction =
  | {
      type: 'add_pizza'
      payload: { pizza: Pizza }
    }
  | { type: 'remove_pizza'; payload: number }
  | { type: 'update_pizza'; payload: { pizza: Pizza; index: number } }
  | { type: 'reset' }

const pizzaReducer = (state: State, action: ReducerAction) => {
  switch (action.type) {
    case 'add_pizza':
      return { ...state, pizzas: [...state.pizzas, action.payload.pizza] }
    case 'remove_pizza':
      return {
        ...state,
        pizzas: state.pizzas.filter((_, i) => action.payload !== i),
      }
    case 'update_pizza': {
      const { pizza } = action.payload
      return {
        ...state,
        pizzas: state.pizzas.map((p, i) =>
          i === action.payload.index
            ? {
                ...pizza,
                totalPrice:
                  pizza.price +
                  pizza.toppings.reduce((sum, value) => sum + value.price, 0),
              }
            : p
        ),
      }
    }
    case 'reset':
      return INITIAL_STATE
  }
}

const usePizzasForm = () => {
  const [{ pizzas }, dispatch] = useReducer(pizzaReducer, INITIAL_STATE)

  const addPizza = (pizza: Pizza) => {
    dispatch({ type: 'add_pizza', payload: { pizza } })
  }

  const removePizza = (index: number) => {
    dispatch({ type: 'remove_pizza', payload: index })
  }

  const updatePizza = (pizza: Pizza, index: number) => {
    dispatch({ type: 'update_pizza', payload: { pizza, index } })
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  return { pizzas, addPizza, removePizza, updatePizza, reset }
}

export default usePizzasForm
