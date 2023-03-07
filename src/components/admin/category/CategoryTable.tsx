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

interface CategoryTableProps {
  headers: string[]
  data: any
}
const CategoryTable = ({ headers, data }: CategoryTableProps) => {
  const rows = Array(10)
    .fill(data)
    .map(({ id, name, parent, description }, index) => (
      <Tr key={index}>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{parent}</Td>
        <Td>{description}</Td>
      </Tr>
    ))

  return (
    <>
      <TableContainer bg={'white'}>
        <Flex align={'center'}>
          <Select
            placeholder=""
            w={'50'}
          >
            <option value="option1">5</option>
            <option value="option2">10</option>
            <option value="option3">20</option>
            <option value="option4">50</option>
            <option value="option5">100</option>
          </Select>
          <Text> records per page</Text>
        </Flex>
        <Table variant="simple">
          <TableCaption>Total categories</TableCaption>
          <Thead>
            <Tr>
              {headers.map((head) => (
                <Th key={head}>{head}</Th>
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
export default CategoryTable
