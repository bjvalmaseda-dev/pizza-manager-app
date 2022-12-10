import { useEffect, useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { OrderDto, Topping } from '../../type'
import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import RadioButtonGroup from './RadioGroup'
import { CheckToppings } from './CheckToppings'

const toppings: Topping[] = [
  { name: 'Bacon', price: 0.99 },
  { name: 'Mushroom', price: 0.99 },
  { name: 'Pepperoni', price: 0.99 },
  { name: 'Olive', price: 0.99 },
  { name: 'Basil', price: 0.99 },
  { name: 'Sweetcorn', price: 0.99 },
  { name: 'Onion', price: 0.99 },
  { name: 'Tomato', price: 0.99 },
]

const prices = { large: 20.0, medium: 15.0, small: 9.0 }

const types = Object.keys(prices).map(label => ({ label, name: 'pizza-type' }))

interface Props {
  index: number
  remove: UseFieldArrayRemove
  register: UseFormRegister<OrderDto>
  control: Control<OrderDto, any>
  setValue: UseFormSetValue<OrderDto>
  getValues: UseFormGetValues<OrderDto>
}

export const PizzaForm = ({
  index,
  control,
  remove,
  register,
  setValue,
  getValues,
}: Props) => {
  const [show, setShow] = useState<boolean>(true)
  const size = useWatch({ control, name: `products.${index}.size` })

  useEffect(() => {
    setValue(`products.${index}.price`, prices[size])
  }, [size])

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  )

  const handleOnChangeExtras = (position: number) => {
    const updatedCheckedState = checkedState.map((item: boolean, index) =>
      index === position ? !item : item
    )

    setCheckedState(updatedCheckedState)

    const extras: Topping[] = updatedCheckedState
      .map((value: boolean, index) => (value ? toppings[index] : null))
      .filter(value => value !== null) as Topping[]

    setValue(`products.${index}.toppings`, extras)
    const extrasPrices = extras.reduce((acc, item) => acc + item.price, 0)
    setValue(`products.${index}.totalPrice`, prices[size] + extrasPrices)
  }

  return (
    <>
      <div className='bg-gray-800 text-white flex justify-between p-2'>
        <span>Pizza {index + 1}</span>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => remove(index)}
            className='font-thin text-sm'
          >
            Remove Pizza
          </button>
          {show ? (
            <AiFillCaretUp
              className='cursor-pointer'
              onClick={() => setShow(!show)}
            />
          ) : (
            <AiFillCaretDown
              className='cursor-pointer'
              onClick={() => setShow(!show)}
            />
          )}
        </div>
      </div>
      {show ? (
        <>
          <div className='p-4'>
            <p className='mb-4'>Choose your size</p>
            <Controller
              name={`products.${index}.size`}
              control={control}
              render={({ field }) => (
                <RadioButtonGroup options={types} {...field} />
              )}
            />
          </div>
          <div className='p-4'>
            <p className='mb-4'>Pick your toppings</p>
            <ul className='grid grid-cols-4 gap-4'>
              {toppings.map((option, i) => {
                return (
                  <li key={`pizza-${index}-option-${i}`}>
                    <CheckToppings
                      id={`pizza-${index}-${option.name}`}
                      label={option.name}
                      checked={checkedState[i]}
                      onChange={() => handleOnChangeExtras(i)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  )
}
