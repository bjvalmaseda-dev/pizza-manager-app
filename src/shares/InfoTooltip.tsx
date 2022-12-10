import { useEffect, useState } from 'react'

interface Props {
  status: 'success' | 'error'
  message?: string
  time?: number
}
export const InfoTooltip = ({ status, message, time }: Props) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, time ?? 3000)
  }, [])

  const colorClass =
    status === 'error'
      ? 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800'
      : 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
  return (
    <>
      {show && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${colorClass}`}
          role='alert'
        >
          <span className='font-medium uppercase'>{status}</span> {message}
        </div>
      )}
    </>
  )
}
