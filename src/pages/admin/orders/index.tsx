import { NextPageWithLayout } from '@/pages/_app'
import useSWR from 'swr'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable from '@/components/admin/order/OrderTable'

type Data = {
  id: number
  name: string
}

const OrderPage: NextPageWithLayout = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json())
  // const url = `${process.env.REST_API_BASEPATH}/orders`
  // const { data, error } = useSWR<Data>(url, fetcher)

  // if (error) return <div>Failed to load data</div>
  // if (!data) return <div>Loading...</div>

  const headers = ['id', 'Sub totals', 'Place at', 'status']
  const data = {
    id: 1,
    subTotals: 1000,
    time: new Date().getTime(),
    status: 'SUCCESS',
  }

  return (
    <>
      <OrderTable
        headers={headers}
        data={data}
      />
    </>
  )
}

OrderPage.getLayout = getAdminLayout

export default OrderPage
