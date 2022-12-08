interface Props {
  completedPercent: number
  classColor?: string
}

export const ProgressBar = ({
  completedPercent,
  classColor = 'bg-blue-600',
}: Props) => {
  return (
    <>
      <div className='w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700'>
        <div
          className={`${classColor} h-1.5 rounded-full`}
          style={{ width: `${completedPercent}%` }}
        ></div>
      </div>
    </>
  )
}
