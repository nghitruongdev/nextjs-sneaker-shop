import NewTable from '@/components/NewTable'
import { OrderModification } from '@/domain/OrderModification'
import { getFetcher } from '@/hooks/useFetcher'
import { Box, Flex, Text, Textarea } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import useSWR from 'swr'
import index from '../../../pages/admin/users/index'

type Props = {
  modificationsLink?: string
}
const util = createColumnHelper<OrderModification>()
const fetcher = getFetcher()
const OrderModificationHistory = ({ modificationsLink }: Props) => {
  //todo: should change to useSWRInfinite, by default spring data rest only return 20
  const { isLoading, data } = useSWR(modificationsLink, fetcher)

  const items: OrderModification[] = data?._embedded.orderModifications
  items?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const columns = useMemo(() => {
    return [
      // util.accessor((row, index) => index + 1, {
      //   header: 'STT',
      // }),
      // util.accessor((row) => row.shippingAddress?.name, {
      //   header: 'Người nhận',
      // }),
      util.accessor((row) => row.note, {
        header: 'Nội dung',
        cell: (info) => (
          <Text
            whiteSpace="pre-wrap"
            w="200px"
          >
            {info.getValue()}
          </Text>
        ),
      }),
      util.accessor((row) => row.editedBy, {
        header: 'Thực hiện bởi',
      }),
      util.accessor((row) => new Date(row.createdAt).toLocaleString('vi-VN'), {
        header: 'Thời gian',
      }),
      // util.accessor((row) => row.status, {
      //   header: 'Order Status',
      //   cell: (info) => (
      //     // <StatusCell
      //     //   info={info}
      //     //   statuses={statuses}
      //     // />
      //     <Badge>{info.getValue()}</Badge>
      //   ),
      // }),
      // util.display({
      //   header: 'Action',
      //   cell: (info) => {
      //     return (
      //       <Button onClick={viewOrder.bind(this, info.row.original)}>
      //         View
      //       </Button>
      //     )
      //   },
      // }),
    ]
  }, [])

  if (isLoading) <p>Loading....</p>
  if (!data) return <>Không tìm thấy lịch sử cập nhật đơn hàng</>

  return (
    <NewTable
      columns={columns}
      data={items}
    />
  )
}
export default OrderModificationHistory
