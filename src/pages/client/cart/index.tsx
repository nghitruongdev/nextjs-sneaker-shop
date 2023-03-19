import ClientLayout from '@/components/layout/ClientLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import Cart from '../../../components/client/cart/Cart'

const CartPage: NextPageWithLayout = () => {
  return (
    <>
    <Cart />
    </>
  )
}
CartPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default CartPage
