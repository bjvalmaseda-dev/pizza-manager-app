import { InputHTMLAttributes } from 'react'
import { FieldErrorsImpl } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  errors: Partial<FieldErrorsImpl<any>>
}

export const CustomInput = ({ label, name, errors, ...rest }: Props) => {
  let message = 'Everything was great'

  if (errors[name]) {
    message = (errors[name]?.message as string) ?? ''
  }
  return (
    <div className='flex flex-col'>
      <label htmlFor='email' className='text-gray-500 text-sm mb-2'>
        {label}
      </label>
      <input
        {...rest}
        className={`border p-2 ${errors[name] ? 'border-red-500' : ''}`}
      />
      {errors[name] && <span className='text-sm text-red-500'>{message}</span>}
    </div>
  )
}
