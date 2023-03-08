import { ReactElement, ReactNode } from 'react'
import {
  TableContainer,
  Text,
  Flex,
  Select,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
} from '@chakra-ui/react'

type Props = {
  headers: string[]
  footers?: string[]
  caption?: string
  children: ReactNode
}
const MyTable = ({ headers, footers, children: body, caption }: Props) => {
  return (
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
        {caption && <TableCaption>{caption}</TableCaption>}

        {/* Headers */}
        <Thead>
          <Tr>
            {headers.map((hd) => (
              <Th key={hd}>{hd}</Th>
            ))}
          </Tr>
        </Thead>

        {/* Body */}
        <Tbody>{body}</Tbody>

        {/* Footer */}
        {footers && (
          <Tfoot>
            <Tr>
              {footers.map((ft, idx) => (
                <Th key={idx}>{ft}</Th>
              ))}
            </Tr>
          </Tfoot>
        )}
      </Table>
      <p>Showing 1 to 5 of 11 entries</p>
    </TableContainer>
  )
}
export default MyTable
