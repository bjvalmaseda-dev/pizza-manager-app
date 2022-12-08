import { ProgressBar } from './ProgressBar'

export const Report = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='uppercase mb-4'>report</h1>
      <div className='flex justify-between w-full px-4 pb-5 border-b border-gray-300 text-gray-800 '>
        <div>
          <p className='text-gray-400 text-xs'>Ontime Delivered</p>
          <span className='font-semibold text-3xl'>+29.7%</span>
          <div className='px-4 my-2'>
            <ProgressBar completedPercent={29.7} classColor='bg-green-500' />
          </div>
        </div>
        <div>
          <p className='text-gray-400 text-xs'>Late deliveries</p>
          <span className='font-semibold text-3xl'> -53.4%</span>
          <div className='px-4 my-2'>
            <ProgressBar completedPercent={54.4} classColor='bg-rose-500' />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full justify-center h-32 px-5'>
        <p className='text-gray-400'>Performance</p>
        <p className='text-green-500 text-2xl'>+0.05%</p>
      </div>
    </div>
  )
}
