import NewTable from '@/components/NewTable'
import Order from '@/domain/Order'
import { OrderItem } from '@/domain/OrderItem'
import { Tr, Td } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { getFetcher } from '../../../hooks/useFetcher'
import useSWR from 'swr'

const util = createColumnHelper<OrderItem>()
const fetcher = getFetcher()
const OrderItemTable = ({ order }: { order: Order }) => {
  const { data, isLoading, error } = useSWR(order?._links?.items.href, fetcher)
  // const { data, isLoading } = useSWR(config.api.orders.search.byUser)
  const items = data?._embedded.orderItems

  const columns = useMemo(() => {
    return [
      util.accessor((row) => row.id, {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      util.accessor((row) => row.variant.id, {
        header: 'Mã sản phẩm',
      }),
      util.accessor((row) => row.quantity, {
        header: 'Số lượng',
      }),
      util.accessor((row) => row.price, {
        header: 'Giá tiền',
      }),
      util.accessor((row) => row.discount, {
        header: 'Giảm giá',
      }),
      util.accessor((row) => row.price * row.quantity, {
        header: 'Thành tiền',
      }),
    ]
  }, [])
  if (isLoading) return <p>Loading....</p>
  if (error) return <p>{JSON.stringify(error)}</p>

  if (items?.length === 0) return <p>Đơn hàng không có sản phẩm</p>
  return (
    <NewTable
      columns={columns}
      data={items}
      additionalRows={
        <Tr
          bg="blue.800"
          color="white"
        >
          <Td
            colSpan={columns.length - 1}
            fontWeight="bold"
          >
            Tổng tiền
          </Td>
          <Td>{order.subTotal}</Td>
        </Tr>
      }
    />
  )
}
export default OrderItemTable
