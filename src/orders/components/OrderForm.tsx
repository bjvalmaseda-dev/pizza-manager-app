import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

import usePizzasForm from '../../hooks/usePizzasForm'
import { Order, OrderDto } from '../../type'

import { OrderSummary } from './OrderSummary'
import { PizzaForm } from './PizzaForm'

export const OrderForm = () => {
  const { pizzas, addPizza, removePizza, updatePizza } = usePizzasForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderDto>()

  const onSubmit: SubmitHandler<OrderDto> = data => {
    const newOrder: Order = {
      ...data,
      products: pizzas,
      total: calculateTotalOrder(),
      id: undefined,
    }
    console.log(newOrder)
  }

  const handleAddPizza = () => {
    addPizza({ size: 'large', price: 25.0, totalPrice: 25.0, toppings: [] })
  }

  const calculateTotalOrder = () =>
    pizzas.reduce((sum, value) => sum + value.totalPrice, 0)

  return (
    <div>
      <h1 className='uppercase text-2xl font-semibold mb-4'>Pizza Order</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className='grid grid-cols-2 gap-10'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-gray-500 text-sm mb-2'>
                Name
              </label>
              <input {...register('name')} className='border p-2' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-gray-500 text-sm mb-2'>
                E-mail Address
              </label>
              <input {...register('email')} className='border p-2' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='address' className='text-gray-500 text-sm mb-2'>
                Address
              </label>
              <input {...register('address')} className='border p-2' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phone' className='text-gray-500 text-sm mb-2'>
                Contact Number
              </label>
              <input {...register('phone')} className='border p-2' />
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
          <input
            type='submit'
            className='px-4 py-1 border-blue-500 text-blue-500 border rounded-sm'
          />
        </div>
      </form>
    </div>
  )
}
