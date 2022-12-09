interface Props {
  total: number
  part: number
  colorClass?: string
}
const CIRCLE = 60 * 2 * Math.PI

export const Spin = ({ total, part, colorClass = 'text-blue-600' }: Props) => {
  const percent = Math.floor((part * 100) / total)
  return (
    <div className='flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5'>
      <svg className='w-36 h-36'>
        <circle
          className='text-gray-300'
          strokeWidth='5'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='72'
          cy='71'
        />
        <circle
          className={colorClass}
          strokeWidth='12'
          strokeDasharray={CIRCLE}
          strokeDashoffset={CIRCLE - (percent / 100) * CIRCLE}
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='72'
          cy='72'
        />
      </svg>
      <span className='text-gray-800 absolute text-xl'>{part}</span>
    </div>
  )
}
