import Order from '@/domain/Order'
import { Badge, Text, Box, Button, Wrap, WrapItem } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import config from 'config'
import { useMemo } from 'react'
import { StatusCell } from './OrderTable'
import useSWR from 'swr'
import React from 'react'
import NewTable from '@/components/NewTable'
import { getFetcher } from '../../../hooks/useFetcher'

type Props = {
  userId?: number
  phoneNumber?: string | null
  viewOrder?: (current: Order) => void
}
const util = createColumnHelper<Order>()
const fetcher = getFetcher()
const UserOrderHistory = ({ userId, phoneNumber, viewOrder }: Props) => {
  //todo: should change to useSWRInfinite, by default spring data rest only return 20
  let keyUrl = userId
    ? config.api.orders.search.findByUserId(userId)
    : config.api.orders.search.findByPhone(phoneNumber)
  console.log('keyUrl', keyUrl)
  const { isLoading, data } = useSWR(keyUrl, fetcher)

  const items = data?._embedded.orders

  const columns = useMemo(() => {
    const cols = [
      util.accessor((row) => row.id, {
        header: 'Order ID',
        cell: (info) => info.getValue(),
      }),
      util.accessor((row) => row.subTotal, {
        header: 'Sub Totals',
      }),
      util.accessor((row) => row.status, {
        header: 'Order Status',
        cell: (info) => <Badge>{info.getValue()}</Badge>,
      }),
    ]

    if (viewOrder) {
      cols.push(
        util.display({
          header: 'Action',
          cell: (info) => {
            return (
              <Button onClick={viewOrder.bind(this, info.row.original)}>
                View
              </Button>
            )
          },
        })
      )
    }
    return cols
  }, [viewOrder])
  // if (!userId && !phoneNumber) throw Error('UserId or phone number not found')
  if (isLoading) <p>Loading....</p>
  if (!data || !items?.length)
    return <Text textAlign="center">Không tìm thấy lịch sử mua hàng</Text>

  return (
    <>
      <OverviewPanel items={items} />
      <NewTable
        columns={columns}
        data={items}
      />
    </>
  )
}

const OverviewPanel = ({ items }: { items?: Order[] }) => {
  const deliveredFailed = []
  const deliveredSuccess = []
  const cancelled = []
  if (items) {
    items.forEach((item) => {
      switch (item.status) {
        case 'DELIVERED_SUCCESS':
          deliveredSuccess.push(items)
        case 'DELIVERED_FAILED':
          deliveredFailed.push(items)
        case 'CANCELLED':
          cancelled.push(items)
      }
    })
    const getBox = (status: string, count: number, colorScheme?: string) => {
      return (
        <Button
          w="150px"
          p="25px"
          // bg="blue.500"
          colorScheme={colorScheme || 'blue'}
        >
          <Text>
            {status} <Text as="span">{count}</Text>
          </Text>
        </Button>
      )
    }
    return (
      <Wrap
        align={'center'}
        justify="center"
        // shouldWrapChildren
      >
        {getBox('Tất cả đơn hàng', items?.length || 0)}
        {getBox('Giao thành công', deliveredSuccess.length || 0, 'green')}
        {getBox('Huỷ đơn hàng', cancelled?.length || 0, 'blackAlpha')}
        {getBox('Giao thất bại', deliveredFailed?.length || 0, 'red')}
        {/* <WrapItem></WrapItem>
        <WrapItem></WrapItem>
        <WrapItem></WrapItem>
        <WrapItem></WrapItem> */}
      </Wrap>
    )
  }
  return <></>
}
const areEquals = (prev: Props, newPrev: Props) =>
  prev.userId === newPrev.userId && prev.phoneNumber === newPrev.phoneNumber

export default React.memo(UserOrderHistory, areEquals)
