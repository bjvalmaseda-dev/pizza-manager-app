import { InputHTMLAttributes } from 'react'

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  key?: string
  disabled?: boolean
}

export const CheckToppings = ({
  label,
  id,
  disabled = false,
  key,
  checked,
  ...rest
}: InputElementProps) => {
  return (
    <label
      htmlFor={id}
      key={key}
      className={`flex justify-start space-x-4 px-4 ${
        checked ?? false ? 'bg-blue-700' : 'border border-blue-500 text-black'
      }  py-2 text-center text-white font-medium uppercase cursor-pointer`}
    >
      <input type='checkbox' id={id} disabled={disabled} {...rest} />
      <span>{label}</span>
    </label>
  )
}
