import UpdateStatusTable from '@/components/admin/order/UpdateStatusTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'

const UnacceptOrder: NextPageWithLayout = () => {
  const headers = ['id', 'Sub totals', 'Place at', 'status']
  const data = {
    id: 1,
    subTotals: 1000,
    time: new Date().getTime(),
    status: 'SUCCESS',
  }

  return (
    <>
      <UpdateStatusTable headers={headers} data={data} />
    </>
  )
}

UnacceptOrder.getLayout = getAdminLayout
export default UnacceptOrder
