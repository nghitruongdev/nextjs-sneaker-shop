import { NextPageWithLayout } from '@/pages/_app'
import useSWR from 'swr'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable from '@/components/admin/order/OrderTable'
import useAxios from '@/hooks/useAxios'

const OrderPage: NextPageWithLayout = () => {
  const transformArray = (data: any) =>
    data?._embedded?.orders.map((item: any) => item)

  const { fetcher, api } = useAxios({ transform: transformArray })
  const { data, isLoading, error } = useSWR(api.ordersUrl, fetcher)

  return (
    <>
      <OrderTable items={data} />
    </>
  )
}

OrderPage.getLayout = getAdminLayout

export default OrderPage
