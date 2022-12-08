import { useMutation } from '@apollo/client'
import React from 'react'
import useNewOrderDataForm from '../../hooks/useNewOrderDataForm'
import usePizzasForm from '../../hooks/usePizzasForm'
import { Order } from '../../type'
import { ADD_ORDER } from '../graphql-mutations'
import { ALL_ORDERS } from '../graphql-queries'
import { OrderSummary } from './OrderSummary'
import { PizzaForm } from './PizzaForm'

export const OrderForm = () => {
  const { pizzas, addPizza, removePizza, updatePizza, reset } = usePizzasForm()
  const { inputValues, changeValue, clearAllInputs } = useNewOrderDataForm()

  const [addOrder] = useMutation(ADD_ORDER, {
    onError: error => {
      console.log(error)
    },
    refetchQueries: [{ query: ALL_ORDERS }],
  })

  const calculateTotalOrder = () =>
    pizzas.reduce((sum, value) => sum + value.totalPrice, 0)

  const handleAddPizza = () => {
    addPizza({ size: 'large', price: 25.0, totalPrice: 25.0, toppings: [] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder: Order = {
      ...inputValues,
      products: pizzas,
      total: calculateTotalOrder(),
    }
    await addOrder({ variables: { ...newOrder } })
    reset()
    clearAllInputs()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    changeValue(name, value)
  }

  return (
    <div>
      <h1 className='uppercase text-2xl font-semibold mb-4'>Pizza Order</h1>
      <form action=''>
        <p className='border-b-2 pb-2 mb-6'>Basic Information</p>
        <fieldset>
          <div className='grid grid-cols-2 gap-10'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-gray-500 text-sm mb-2'>
                Name
              </label>
              <input
                value={inputValues.name}
                type='text'
                name='name'
                onChange={handleChange}
                className='border p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-gray-500 text-sm mb-2'>
                E-mail Address
              </label>
              <input
                value={inputValues.email}
                type='text'
                name='email'
                onChange={handleChange}
                className='border p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='address' className='text-gray-500 text-sm mb-2'>
                Address
              </label>
              <input
                value={inputValues.address}
                type='text'
                name='address'
                onChange={handleChange}
                className='border p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phone' className='text-gray-500 text-sm mb-2'>
                Contact number
              </label>
              <input
                value={inputValues.phone}
                type='text'
                name='phone'
                onChange={handleChange}
                className='border p-2'
              />
            </div>
          </div>
        </fieldset>
        <div className='flex justify-between mt-8'>
          <h2>Choose your pizza</h2>
          <button
            type='button'
            onClick={handleAddPizza}
            className='text-green-500 border rounded-sm py-1 px-4 border-green-500'
          >
            Add Pizza
          </button>
        </div>
        {pizzas?.map((pizza, i) => (
          <div key={i} className='mt-3'>
            <PizzaForm
              pizza={pizza}
              index={i}
              remove={removePizza}
              update={updatePizza}
            />
          </div>
        ))}
        <OrderSummary total={calculateTotalOrder()} pizzas={pizzas} />
        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            className='px-4 py-1 border-blue-500 text-blue-500 border rounded-sm'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit}
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  )
}
