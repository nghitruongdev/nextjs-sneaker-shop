import UpdateStatusTable from '@/components/admin/order/UpdateStatusTable'
import useAxios from '@/hooks/useAxios'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'

const UnacceptOrder: NextPageWithLayout = () => {
  const transformArray = (data: any) =>
    data?._embedded?.orders
      .filter((item: any) => item.status)
      .map((item: any) => item)

  const { fetcher, api } = useAxios({ transform: transformArray })
  const { data, isLoading, error } = useSWR(api.ordersUrl, fetcher)

  return (
    <>
      <UpdateStatusTable />
    </>
  )
}

UnacceptOrder.getLayout = getAdminLayout
export default UnacceptOrder
function useSWR(
  ordersUrl: any,
  fetcher: any
): { data: any; isLoading: any; error: any } {
  throw new Error('Function not implemented.')
}
