import MyTable from '@/components/common/MyTable'
import Order from '@/domain/Order'
import { Tr, Td } from '@chakra-ui/react'

interface Props {
  items: Order[]
}
const OrderTable = ({ items }: Props) => {
  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  const titles = ['id', 'Sub totals', 'Place at', 'status']

  return (
    <MyTable
      headers={titles}
      caption="VNCO muôn năm"
    >
      {items.map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.subTotals}</Td>
          <Td>{item.time.getTime()}</Td>
          <Td>{item.status}</Td>
        </Tr>
      ))}
    </MyTable>
  )
}

export default OrderTable
