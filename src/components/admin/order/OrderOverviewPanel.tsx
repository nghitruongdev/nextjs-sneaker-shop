import Order from '@/domain/Order'
import { TabPanel, Text, Box, Card, CardBody, HStack } from '@chakra-ui/react'
import config from 'config'
import { useState } from 'react'
import OrderTable from './OrderTable'
import useSWR from 'swr'
import { getFetcher } from '../../../hooks/useFetcher'

type OverviewProps = {
  // pageIndex: number
  // setSize: (size: number) => void
  // changePageHandler: (total: number, index: number) => void
  // keyUrl: string
  statuses: string[]
  viewOrder: (current: Order) => void
  // items: Order[]
}
const fetcher = getFetcher()
const OrderOverviewPanel = ({
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

export default OrderOverviewPanel
