import { InputHTMLAttributes } from 'react'

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  key?: string
  disabled?: boolean
}

export const RadioSize = ({
  label,
  id,
  disabled = false,
  key = '',
  checked,
  ...rest
}: InputElementProps) => {
  return (
    <div key={key}>
      <input
        type='radio'
        id={id}
        disabled={disabled}
        className='hidden'
        {...rest}
      />
      <label
        htmlFor={id}
        className={`px-4 ${
          checked ?? false ? 'bg-blue-700' : 'border border-blue-500 text-black'
        }  py-2 text-center text-white font-medium uppercase cursor-pointer`}
      >
        {label}
      </label>
    </div>
  )
}
