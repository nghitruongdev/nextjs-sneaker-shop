import MyTable from '@/components/common/MyTable'
import { Td, Tr } from '@chakra-ui/react'
import Product from '@/domain/Product'

type Props = {
  items: Product[]
}
const ProductTable = ({ items }: Props) => {
  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  const titles = [
    'Id',
    'Name',
    'Images',
    'Description',
    'Min Price',
    'Publish Date',
    'Status',
  ]

  return (
    <MyTable
      headers={titles}
      caption="VNCO muôn năm"
    >
      {items.map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.name}</Td>
          <Td>{item.images}</Td>
          <Td>{item.shortDesc}</Td>
          <Td>{item.minPrice}</Td>
          <Td>{item.publishDate?.getDate()}</Td>
          <Td>{item.status}</Td>
        </Tr>
      ))}
    </MyTable>
  )
}
export default ProductTable
