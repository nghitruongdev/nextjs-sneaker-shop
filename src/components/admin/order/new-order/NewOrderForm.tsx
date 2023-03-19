import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import ShippingAddressForm from './ShippingAddressForm'
import CartForm from './CartForm'

const NewOrderForm = () => {
  return (
    <>
      <SimpleGrid
        columns={{
          md: 2,
        }}
        h="full"
      >
        <Card p={5}>
          <CardHeader>Thông tin giao hàng</CardHeader>
          <CardBody>
            <ShippingAddressForm />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CartForm />
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  )
}

export default NewOrderForm
