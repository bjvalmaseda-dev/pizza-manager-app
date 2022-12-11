import { useEffect, useState } from 'react'

export interface InfoTooltipProps {
  status: 'success' | 'error'
  message?: string
  time?: number
  autoClose?: boolean
}
export const InfoTooltip = ({
  status,
  message,
  time,
  autoClose = true,
}: InfoTooltipProps) => {
  const [show, setShow] = useState(true)

  if (autoClose) {
    useEffect(() => {
      setTimeout(() => {
        setShow(false)
      }, time ?? 3000)
    }, [])
  }

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
