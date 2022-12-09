import { useForm, SubmitHandler } from 'react-hook-form'
import { OrderDto } from '../../type'

export default function Test() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderDto>()
  const onSubmit: SubmitHandler<OrderDto> = data => console.log(data)

  console.log(watch('email')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue='test' {...register('email')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register('name', { required: true })}
        className={'border border-fuchsia-400'}
      />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}

      <input type='submit' />
    </form>
  )
}
