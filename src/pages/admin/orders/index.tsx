import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import OrderTable from '@/components/admin/order/OrderTable'
import config from 'config'
import { useState } from 'react'
import {
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { AiFillAccountBook } from 'react-icons/ai'
import Order from '@/domain/Order'
import useSWR from 'swr'
import { getFetcher } from '../../../hooks/useFetcher'
import React from 'react'
import OrderInfoPanel from '@/components/admin/order/OrderInfoPanel'

const fetcher = getFetcher()
const OrderPage: NextPageWithLayout = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [current, setCurrent] = useState<Order | null>(null)

  const { data: statuses, isLoading } = useSWR(
    config.api.orders.status,
    fetcher
  )

  const showOrderInfo = (order: Order) => {
    setCurrent(order)
    setTabIndex(1)
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
        onChange={setTabIndex}
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
              <OrderInfoPanel
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
