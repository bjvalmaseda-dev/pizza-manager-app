import { Outlet, useNavigate } from 'react-router-dom'
import {
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineQuestionCircle,
  AiFillAppstore,
  AiOutlineCreditCard,
} from 'react-icons/ai'
import store from './redux/store'

import { BsBoxSeam } from 'react-icons/bs'
import './App.css'
import { Provider } from 'react-redux'
import { useSubscriptions } from './hooks/useSubscriptions'

function PizzaApp() {
  const navigate = useNavigate()
  useSubscriptions()
  return (
    <Provider store={store}>
      <div className='bg-white'>
        <div className='bg-gradient-to-b from-blue-900 to-slate-900 text-white px-28 h-2/3 absolute top-0 w-screen'>
          <nav className='flex justify-between py-2 px-4'>
            <div>Logo</div>
            <div className='flex items-center space-x-2 text-lg'>
              <AiOutlineMessage />
              <AiOutlineBell />
              <div className='flex items-center space-x-1'>
                <AiOutlineQuestionCircle />{' '}
                <span className='text-sm'>Help</span>
              </div>
            </div>
          </nav>
          <div className='px-4 mt-24 '>
            <ul className='flex-row space-y-3  border-b w-36 pb-7 border-blue-500'>
              <button
                onClick={() => navigate('/orders/dashboard')}
                className='flex items-center space-x-2 hover:border-l-4 p-1 pl-3 hover:bg-gradient-to-r hover:from-blue-900'
              >
                <AiFillAppstore />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/orders/new')}
                className='flex items-center space-x-2 hover:border-l-4 p-1 pl-3 hover:bg-gradient-to-r hover:from-blue-900'
              >
                <AiOutlineCreditCard /> <span>New Order</span>
              </button>
              <button
                onClick={() => navigate('/orders/manage')}
                className='flex items-center space-x-2 hover:border-l-4 p-1 pl-3 hover:bg-gradient-to-r hover:from-blue-900'
              >
                <BsBoxSeam />
                <span>Status</span>
              </button>
            </ul>
          </div>
        </div>
        <div className='relative top-20 left-80 bg-white w-8/12 min-h-screen rounded-md p-8'>
          <Outlet />
        </div>
      </div>
    </Provider>
  )
}

export default PizzaApp
