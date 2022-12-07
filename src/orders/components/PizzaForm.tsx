/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { AiFillCaretUp } from 'react-icons/ai'
import { Pizza, Topping } from '../../type'

const toppings: Topping[] = [
  { name: 'Bacon', price: 0.99 },
  { name: 'Mushroom', price: 0.99 },
  { name: 'Olive', price: 0.99 },
  { name: 'Basil', price: 0.99 },
  { name: 'Sweetcorn', price: 0.99 },
  { name: 'Onion', price: 0.99 },
  { name: 'Tomato', price: 0.99 },
]
const prices = [19.9, 23.9, 27.9]

interface Props {
  pizza: Pizza
  index: number
  remove: (i: number) => void
  update: (pizza: Pizza, i: number) => void
}

export const PizzaForm = ({ pizza, index, remove, update }: Props) => {
  const [extras, setExtras] = useState<Topping[]>([])

  const handleCheckedTopping = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: Topping
  ) => {
    const checked = e.target.checked
    console.log(checked)

    if (checked) {
      setExtras([...extras, option])
      console.log(extras)
    } else {
      setExtras(extras.filter(o => o.name !== option.name))
    }
    update({ ...pizza, toppings: extras }, index)
  }

  const handleRemovePizza = () => {
    remove(index)
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
          <AiFillCaretUp />
        </div>
      </div>
      <div className='p-4'>
        <p className='mb-4'>Choose your size</p>
        <input type='radio' name='size' value='large' />
        Large
        <input type='radio' name='size' value='medium' /> Medium
        <input type='radio' name='size' value='small' />
        Small
      </div>
      <div className='p-4'>
        <p className='mb-4'>Pick your toppings</p>
        <ul>
          {toppings.map((option, i) => {
            return (
              <li key={`pizza-${index}-option-${i}`}>
                <input
                  type='checkbox'
                  id={`pizza-${index}-${option.name}`}
                  name={`pizza-${index}-${option.name}`}
                  onChange={e => handleCheckedTopping(e, option)}
                />
                <label htmlFor={option.name}>{option.name}</label>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
