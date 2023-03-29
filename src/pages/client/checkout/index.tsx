import ClientLayout from '@/components/layout/ClientLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import Checkout from '../../../components/client/Checkout'

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
        <Checkout/>
    </>
  )
}
CheckoutPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default CheckoutPage
