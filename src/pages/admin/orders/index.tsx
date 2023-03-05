import AdminLayout from '@/components/layout/AdminLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'

const OrderPage: NextPageWithLayout = () => {
  return (
    <>
      <section>This is order page</section>
    </>
  )
}

OrderPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default OrderPage
