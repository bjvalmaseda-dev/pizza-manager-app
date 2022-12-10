import { CustomRadio } from './CustomRadio'

export interface IOption {
  label: string
  name?: string
  disabled?: boolean
}

export interface IOptionGroup {
  label?: string
  value?: any
  options: IOption[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButtonGroup = ({
  label,
  options,
  value,
  onChange,
}: IOptionGroup) => {
  return (
    <fieldset>
      {label && <legend className='mb-4'>{label}</legend>}
      <div className='flex gap-4'>
        {options.map(({ label, disabled, name }, index) => {
          const shortenedOptionLabel = label.replace(/\s+/g, '')
          const optionId = `radio-option-${shortenedOptionLabel}`
          return (
            <CustomRadio
              value={label}
              label={label}
              key={optionId}
              id={optionId}
              name={name}
              disabled={disabled}
              checked={value === label}
              onChange={onChange}
            />
          )
        })}
      </div>
    </fieldset>
  )
}
export default RadioButtonGroup
