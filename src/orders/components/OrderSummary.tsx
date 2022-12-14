import { Control, useWatch } from 'react-hook-form'
import { OrderDto } from '../../type'

interface Props {
  control: Control<OrderDto, any>
}

export const OrderSummary = ({ control }: Props) => {
  const products = useWatch({ control, name: `products` })
  const total = useWatch({ control, name: `total` })
  return (
    <>
      <h1 className='text-xl text-gray-500 font-normal mb-4 border-b pb-2'>
        Summary
      </h1>
      {products.map((pizza, index) => {
        return (
          <div key={index} className='mb-4'>
            <div className='flex justify-between'>
              <h3>{`${pizza.size} pizza ${index + 1}`}</h3>
              <span>GPB {pizza.totalPrice}</span>
            </div>
            {pizza.toppings?.map((topping, i) => (
              <div
                key={`${index}-o-${i}`}
                className='flex justify-between pl-4 text-gray-600'
              >
                <span>{topping.name}</span>
                <span>{topping.price}</span>
              </div>
            ))}
          </div>
        )
      })}
      <div className='border-t-2 flex justify-between py-4 mt-5 border-black uppercase text-2xl font-semibold'>
        <span>total</span>
        <span>GBP {total}</span>
      </div>
    </>
  )
}
