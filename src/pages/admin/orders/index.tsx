import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable, { StatusCell } from '@/components/admin/order/OrderTable'
import config from 'config'
import { memo, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { AiFillAccountBook } from 'react-icons/ai'
import Order from '@/domain/Order'
import useSWR from 'swr'
import { getFetcher } from '../../../hooks/useFetcher'
import { createColumnHelper } from '@tanstack/react-table'
import { OrderItem } from '@/domain/OrderItem'
import NewTable from '@/components/NewTable'
import React from 'react'
import UserOrderHistory from '@/components/admin/order/UserOrderHistory'
import { Goblin_One } from '@next/font/google'
import OrderModificationHistory from '../../../components/admin/order/OrderModificationHistory'

const OrderPage: NextPageWithLayout = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [current, setCurrent] = useState<Order | null>(null)
  const fetcher = getFetcher()

  const { data: statuses, isLoading } = useSWR(
    config.api.orders.status,
    fetcher
  )

  const showOrderInfo = (order: Order) => {
    setCurrent(order)
    setTabIndex(1)
  }

  const handleTabsChange = (index: any) => {
    setTabIndex(index)
  }
  console.debug('Order page rerendered')

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {' '}
      <Tabs
        isLazy
        isTruncated
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>
            <Icon
              as={AiFillAccountBook}
              mr={2}
            />
            Tổng quan đơn hàng
          </Tab>
          {current && (
            <Tab>
              <Icon
                as={AiFillAccountBook}
                mr={2}
              />
              Chi tiết đơn hàng
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <OverviewPanel
            // pageIndex={pageIndex}
            // setSize={setSize}
            // changePageHandler={changePageHandler}
            // keyUrl={keyUrl}
            statuses={statuses}
            viewOrder={showOrderInfo}
          />
          {current && (
            <TabPanel>
              <ViewOrderPanel
                currentOrder={current}
                statuses={statuses}
                viewOrder={showOrderInfo}
              />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  )
}

OrderPage.getLayout = getAdminLayout

export default OrderPage

type OverviewProps = {
  // pageIndex: number
  // setSize: (size: number) => void
  // changePageHandler: (total: number, index: number) => void
  // keyUrl: string
  statuses: string[]
  viewOrder: (newCurrent: Order) => void
  // items: Order[]
}
const OverviewPanel = ({
  // pageIndex,
  // setSize,
  // changePageHandler,
  // keyUrl,
  statuses,
  viewOrder,
}: OverviewProps) => {
  const [size, setSize] = useState<number>(5)
  const [pageIndex, setPageIndex] = useState(0)
  // const { get } = useAxios()
  // const [overviewStatuses, setOverviewStatuses] = useState<
  //   {
  //     label: string
  //     count: number
  //   }[]
  // >([])

  const keyUrl = `${config.api.orders.url}?page=${pageIndex}&size=${size}`
  const filteredStatuses = statuses?.filter(
    (status) =>
      status === 'WAIT_FOR_ACCEPT' ||
      status === 'ON_DELIVERY' ||
      status === 'DELIVERED_SUCCESS' ||
      status === 'CANCELLED'
  )
  filteredStatuses?.unshift('ALL')

  const changePageHandler = (total: number, index: number) => {
    if (index) return
    if (pageIndex === index) return
    if (index >= total) return
    if (index < 0) return
    setPageIndex(index)
  }

  return (
    <TabPanel>
      {/* orders per status */}
      {filteredStatuses && (
        <Card>
          <CardBody>
            <HStack justify="space-between">
              {filteredStatuses.map((status) => (
                <OverviewStatus
                  key={status}
                  status={status}
                />
              ))}
            </HStack>
          </CardBody>
        </Card>
      )}

      <OrderTable
        statuses={statuses}
        indexPage={pageIndex}
        setSize={setSize}
        onChangePage={changePageHandler}
        keyUrl={keyUrl}
        viewOrder={viewOrder}
      />
    </TabPanel>
  )
}

const fetcher = getFetcher()
const OverviewStatus = ({
  status,
  manualCount,
}: {
  status: string
  manualCount?: number
}) => {
  const { data: count } = useSWR(
    config.api.orders.search.countByStatus(status),
    fetcher
  )

  return (
    <>
      {(manualCount || count || count === 0) && (
        <Box
          w="200px"
          h="200px"
          bg={'red'}
        >
          <Text as="h5">{status}</Text>
          <Text>{manualCount || count}</Text>
        </Box>
      )}
    </>
  )
}

const ViewOrderPanel = ({
  currentOrder,
  statuses,
  viewOrder,
}: {
  currentOrder: Order
  statuses: string[]
  viewOrder: (current: Order) => void
}) => {
  const { id, subTotal: subTotals, status, _links } = currentOrder
  return (
    <Box>
      <Card mb={5}>
        <CardHeader bg={'red'}>
          <Heading>Chi tiết đơn hàng</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            OrderID:{' '}
            <Text
              as="span"
              fontWeight="bold"
            >
              {id}
            </Text>
          </Text>

          <Text>
            Tổng tiền: <Text as="span">{subTotals || 0}</Text>
          </Text>

          <Text>
            Trạng thái: <Text as="span">{status}</Text>
          </Text>

          <Text>
            Ngày tạo:{' '}
            <Text as="span">
              {new Date(Date.now()).toLocaleString('en-US')}
            </Text>
          </Text>

          <Text>
            Cập nhật lần cuối:{' '}
            <Text as="span">
              {new Date(Date.now()).toLocaleString('en-US')}
            </Text>
          </Text>
          {/* //todo: thêm note cho đơn hàng bỏ trạng thái active */}
          <OrderItemTable order={currentOrder} />
        </CardBody>
      </Card>
      <SimpleGrid
        spacing={5}
        columns={2}
        h="50vh"
        mb={5}
      >
        <Card
          minH="250px"
          p={5}
        >
          <CardHeader> Lịch sử cập nhật đơn hàng</CardHeader>
          <CardBody>
            <OrderModificationHistory
              modificationsLink={_links?.modifications.href}
            />
          </CardBody>
        </Card>
        <Card
          p={5}
          borderWidth={1}
          borderColor={'gray.50'}
          overflowY="scroll"
        >
          <CardHeader>Lịch sử đặt hàng</CardHeader>
          <CardBody overflowY={'scroll'}>
            <UserOrderHistory
              userId={currentOrder?.user?.id}
              viewOrder={viewOrder}
            />
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

const util = createColumnHelper<OrderItem>()
const OrderItemTable = ({ order }: { order: Order }) => {
  const { data, isLoading, error } = useSWR(order?._links?.items.href, fetcher)
  // const { data, isLoading } = useSWR(config.api.orders.search.byUser)
  const items = data?._embedded.orderItems
  console.log('data', items)
  console.log('Order Item rerenderedx')

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
