import { useReducer } from 'react'
import { Order } from '../type'

const INITIAL_STATE = {
  name: '',
  email: '',
  address: '',
  phone: '',
}

type InputValues = Omit<Order, 'products' | 'total'>

interface FormState {
  inputValues: InputValues
}

type FormReducerAction =
  | {
      type: 'change_value'
      payload: { inputName: string; inputValue: string }
    }
  | { type: 'clear' }

const formReducer = (
  state: FormState['inputValues'],
  action: FormReducerAction
) => {
  switch (action.type) {
    case 'change_value':
      // eslint-disable-next-line no-case-declarations
      const { inputName, inputValue } = action.payload
      return { ...state, [inputName]: inputValue }
    case 'clear':
      return INITIAL_STATE
  }
}

const useNewOrderDataForm = () => {
  return useReducer(formReducer, INITIAL_STATE)
}

export default useNewOrderDataForm
