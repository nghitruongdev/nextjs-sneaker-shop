import { NextPageWithLayout } from '@/pages/_app'
import useSWR from 'swr'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable from '@/components/admin/order/OrderTable'
import useAxios from '@/hooks/useAxios'
import config from 'config'
import useFetcher from '@/hooks/useFetcher'
import { useState } from 'react'

const OrderPage: NextPageWithLayout = () => {
  const [size, setSize] = useState<number>(5)
  const [pageIndex, setPageIndex] = useState(0)

  console.debug('Order page rerendered')

  const keyUrl = `${config.api.orders.url}?sort=id,desc&page=${pageIndex}&size=${size}`

  const changePageHandler = (total: number, index: number) => {
    if (index) return
    if (pageIndex === index) return
    if (index >= total) return
    if (index < 0) return
    setPageIndex(index)
  }

  return (
    <>
      <OrderTable
        indexPage={pageIndex}
        setSize={setSize}
        onChangePage={changePageHandler}
        keyUrl={keyUrl}
      />
    </>
  )
}

OrderPage.getLayout = getAdminLayout

export default OrderPage
