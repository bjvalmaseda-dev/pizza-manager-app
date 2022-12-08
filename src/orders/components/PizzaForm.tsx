/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { RadioSize } from './RadioSize'
import { CheckToppings } from './CheckToppings'
import { Pizza, Size, Topping } from '../../type'

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
const prices = { large: 20.0, medium: 15.0, small: 9.5 }

interface Props {
  pizza: Pizza
  index: number
  remove: (i: number) => void
  update: (pizza: Pizza, i: number) => void
}

export const PizzaForm = ({ pizza, index, remove, update }: Props) => {
  const [show, setShow] = useState<boolean>(true)
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  )
  const [size, setSize] = useState<string>('large')

  const handleOnChangeExtras = (position: number) => {
    const updatedCheckedState = checkedState.map((item: boolean, index) =>
      index === position ? !item : item
    )

    setCheckedState(updatedCheckedState)
    const extras: Topping[] = updatedCheckedState
      .map((value: boolean, index) => (value ? toppings[index] : null))
      .filter(value => value !== null) as Topping[]

    update({ ...pizza, toppings: extras }, index)
  }

  const handleOnChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const size = target.value as Size

    if (target.checked) {
      update({ ...pizza, size, price: prices[size] }, index)
    }
  }
  const handleRemovePizza = () => {
    remove(index)
  }

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <>
      <div className='bg-gray-800 text-white flex justify-between p-2'>
        <span>Pizza {index + 1}</span>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={handleRemovePizza}
            className='font-thin text-sm'
          >
            Remove Pizza
          </button>
          {show ? (
            <AiFillCaretUp onClick={toggleShow} />
          ) : (
            <AiFillCaretDown onClick={toggleShow} />
          )}
        </div>
      </div>
      {show ? (
        <>
          {' '}
          <div className='p-4'>
            <p className='mb-4'>Choose your size</p>
            <div className='flex gap-4'>
              <RadioSize
                id={`pizza-${index}-large`}
                name='size'
                label='Large'
                value='large'
                checked={pizza.size === 'large'}
                onChange={handleOnChangeSize}
              />
              <RadioSize
                id={`pizza-${index}-medium`}
                name='size'
                label='medium'
                value='medium'
                checked={pizza.size === 'medium'}
                onChange={handleOnChangeSize}
              />
              <RadioSize
                id={`pizza-${index}-small`}
                name='size'
                label='small'
                value='small'
                checked={pizza.size === 'small'}
                onChange={handleOnChangeSize}
              />
            </div>
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
