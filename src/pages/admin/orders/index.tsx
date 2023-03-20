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
import OrderInfoPanel from '@/components/admin/order/OrderInfoPanel'
import OrderOverviewPanel from '@/components/admin/order/OrderOverviewPanel'

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
          <OrderOverviewPanel
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
