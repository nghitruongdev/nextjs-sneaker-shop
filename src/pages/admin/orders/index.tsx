import { NextPageWithLayout } from '@/pages/_app'
import useSWR from 'swr'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable from '@/components/admin/order/OrderTable'
import useAxios from '@/hooks/useAxios'
import useFetcher from '@/hooks/useFetcher'
import config from 'config'

const OrderPage: NextPageWithLayout = () => {
  const transformArray = (data: any) =>
    data?._embedded?.orders.map((item: any) => item)

  const { data, isLoading, error } = useFetcher(config.api.orders, {
    transform: transformArray,
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error)}</>

  return (
    <>
      <OrderTable items={data} />
    </>
  )
}

OrderPage.getLayout = getAdminLayout

export default OrderPage
