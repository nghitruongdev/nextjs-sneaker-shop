import Order from '@/domain/Order'
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  SimpleGrid,
  Text,
  Box,
} from '@chakra-ui/react'
import OrderItemTable from './OrderItemTable'
import OrderModificationHistory from './OrderModificationHistory'
import UserOrderHistory from './UserOrderHistory'

const OrderInfoPanel = ({
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
export default OrderInfoPanel
