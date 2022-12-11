import { useOrders } from '../../hooks/useOrders'
import { InfoTooltip } from '../../shares/InfoTooltip'
import { Loading } from '../../shares/Loading'
import { OrderHistory } from '../components/OrderHistory'
import { OrderMeters } from '../components/OrderMeters'
import { Report } from '../components/Report'
import { Sales } from '../components/Sales'

export const Dashboard = () => {
  const { loading, error } = useOrders()

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <InfoTooltip status='error' message={error.message} autoClose={false} />
      ) : (
        <>
          <div className='grid grid-cols-2 gap-5'>
            <OrderMeters />
            <Sales />
          </div>
          <div className='grid grid-cols-3 mt-12'>
            <div className='col-span-2'>
              <OrderHistory />
            </div>
            <div>
              <Report />
            </div>
          </div>
        </>
      )}
    </>
  )
}
