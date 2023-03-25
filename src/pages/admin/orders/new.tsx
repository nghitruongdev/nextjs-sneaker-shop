import NewOrderForm from '@/components/admin/order/new-order/NewOrderForm'
import { NextPageWithLayout } from '../../_app'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'

const NewOrder: NextPageWithLayout = () => {
  return (
    <>
      <NewOrderForm />
    </>
  )
}

NewOrder.getLayout = getAdminLayout

export default NewOrder
