import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
  Controller,
} from 'react-hook-form'
import { useOrders } from '../../hooks/useOrders'
import { InfoTooltip } from '../../shares/InfoTooltip'
import { OrderDto } from '../../type'
import { CustomInput } from './CustomInput'
import { OrderSummary } from './OrderSummary'
import { PizzaForm } from './PizzaForm'

const getTotal = (payload: OrderDto['products']): number => {
  return payload?.reduce((acc, item) => acc + item.totalPrice, 0) || 0
}

export const OrderForm = () => {
  const { addOrder, mutationStatus } = useOrders()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<OrderDto>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      products: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'products',
    control,
    rules: {
      required: 'Please append at least 1 item',
    },
  })

  const products = useWatch({ control, name: 'products' })

  useEffect(() => {
    setValue('total', getTotal(products))
  }, [products])

  const onSubmit: SubmitHandler<OrderDto> = async data => {
    await addOrder({ variables: { ...data } })
    reset()
  }

  return (
    <div>
      <h1 className='uppercase text-2xl font-semibold mb-4'>Pizza Order</h1>
      {mutationStatus && (
        <InfoTooltip
          status={mutationStatus.status}
          message={mutationStatus.message}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className='grid grid-cols-2 gap-10'>
            <Controller
              name={`name`}
              control={control}
              rules={{ required: 'The name is required' }}
              render={({ field }) => (
                <CustomInput errors={errors} label='Name' {...field} />
              )}
            />
            <Controller
              name={`email`}
              control={control}
              rules={{ required: 'The email is required' }}
              render={({ field }) => (
                <CustomInput
                  errors={errors}
                  label='E-mail Address'
                  {...field}
                />
              )}
            />
            <Controller
              name={'address'}
              control={control}
              rules={{ required: 'The address is required' }}
              render={({ field }) => (
                <CustomInput errors={errors} label='Address' {...field} />
              )}
            />
            <Controller
              name={'phone'}
              control={control}
              rules={{ required: 'The contact number is required' }}
              render={({ field }) => (
                <CustomInput
                  errors={errors}
                  label='Contact number'
                  {...field}
                />
              )}
            />
          </div>
        </fieldset>
        <div className='flex justify-between mt-8'>
          <h2>Choose your pizza</h2>
          <button
            type='button'
            onClick={() =>
              append({
                size: 'large',
                price: 25.0,
                toppings: [],
                totalPrice: 25.0,
              })
            }
            className='text-green-500 border rounded-sm py-1 px-4 border-green-500'
          >
            Add Pizza
          </button>
        </div>

        {fields.map((product, index) => (
          <div key={product.id} className='mt-3'>
            <PizzaForm
              index={index}
              remove={remove}
              register={register}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
          </div>
        ))}
        <OrderSummary control={control} />
        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            disabled={!!errors.products}
            className='px-4 py-1 border-blue-500 text-blue-500 border rounded-sm disabled:opacity-70 disabled:cursor-not-allowed'
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  )
}
