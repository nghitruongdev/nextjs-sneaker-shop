import MyTable from '@/components/common/MyTable'
import Order from '@/domain/Order'
import {
  Flex,
  Text,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react'

const UpdateStatusTable = ({ items }: { items: Order[] }) => {
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
          <Select placeholder="Status order">
            <option value="option1">ĐANG CHỜ XÁC NHẬN</option>
            <option value="option2">ĐÃ THANH TOÁN</option>
            <option value="option3">ĐANG CHUẨN BỊ</option>
            <option value="option3">ĐANG GIAO HÀNG</option>
            <option value="">ĐÃ HUỶ</option>
          </Select>
        </Tr>
      ))}
    </MyTable>
  )
}
