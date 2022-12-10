import { InputHTMLAttributes } from 'react'

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  key?: string | null
  disabled?: boolean
}

export const CustomRadio = ({
  label,
  disabled = false,
  key = null,
  checked,
  ...rest
}: InputElementProps) => {
  return (
    <div key={key}>
      <label
        className={`px-4 ${
          checked ?? false ? 'bg-blue-700' : 'border border-blue-500 text-black'
        }  py-2 text-center text-white font-medium uppercase cursor-pointer`}
      >
        <input type='radio' disabled={disabled} className='hidden' {...rest} />
        {label}
      </label>
    </div>
  )
}
