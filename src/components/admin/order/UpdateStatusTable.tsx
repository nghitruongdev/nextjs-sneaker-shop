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

interface OrderTableProps {
  headers: string[]
  data: any
}
const UpdateStatusTable = ({ headers, data }: OrderTableProps) => {
  const rows = Array(10)
    .fill(data)
    .map(({ id, subTotals, time, status }) => (
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{subTotals}</Td>
        <Td>{time}</Td>
        <Select placeholder="Status order">
          <option value="option1">ĐANG CHỜ XÁC NHẬN</option>
          <option value="option2">ĐÃ THANH TOÁN</option>
          <option value="option3">ĐANG CHUẨN BỊ</option>
          <option value="option3">ĐANG GIAO HÀNG</option>
          <option value="">ĐÃ HUỶ</option>
        </Select>
      </Tr>
    ))

  return (
    <>
      <TableContainer bg={'white'}>
        <Flex align={'center'}>
          <Select placeholder="" w={'50'}>
            <option value="option1" selected>
              5
            </option>
            <option value="option2">10</option>
            <option value="option3">20</option>
            <option value="option4">50</option>
            <option value="option5">100</option>
          </Select>
          <Text> records per page</Text>
        </Flex>
        <Table variant="simple">
          <TableCaption>Total orders</TableCaption>
          <Thead>
            <Tr>
              {headers.map((head) => (
                <Th>{head}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
          {/* <Tfoot>
            <Tr>
              {headers.map((head) => (
                <Th>{head}</Th>
              ))}
            </Tr>
          </Tfoot> */}
        </Table>
        <p>Showing 1 to 5 of 11 entries</p>
      </TableContainer>
    </>
  )
}
export default UpdateStatusTable
