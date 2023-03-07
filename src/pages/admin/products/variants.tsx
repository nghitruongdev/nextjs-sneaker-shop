import { NextPageWithLayout } from '@/pages/_app'
import {
  Container,
  Box,
  Text,
  Flex,
  chakra,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
const VariantPage: NextPageWithLayout = () => {
  return (
    <>
      <Container maxW="3xl" py={10} px={4}>
        <Box
          border="1px solid"
          borderColor="gray.400"
          rounded="md"
          boxShadow="lg"
          overflow="hidden"
        >
          <Flex justify="left" p={5}>
            <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
              Product Variants
            </chakra.h3>
          </Flex>
          <Divider />
          <TableContainer>
            <Table size="md">
              <Thead>
                <Tr fontWeight="900">
                  <Th>Network</Th>
                  <Th>Visitors</Th>
                  <Th>New Users Rate</Th>
                  <Th>Active</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array(5)
                  .fill({
                    name: 'Instagram',
                    visotors: '3,550',
                    visotorsRatio: '70%',
                    // active: Math.random() > 0.5,
                    active: true,
                  })
                  .map((network, index) => (
                    <Tr key={index}>
                      <Td fontSize="sm">{network.name}</Td>
                      <Td fontSize="sm">{network.visotors}</Td>
                      <Td>
                        <Box
                          w="100%"
                          bg={'gray.300'}
                          rounded="md"
                          _dark={{
                            bg: 'gray.600',
                          }}
                        >
                          <Box
                            w={network.visotorsRatio}
                            h={2}
                            bg="blue.400"
                            rounded="md"
                          ></Box>
                        </Box>
                      </Td>
                      <Td>
                        <FormControl>
                          {/* <FormLabel htmlFor="isChecked">isChecked:</FormLabel> */}
                          <Switch
                            id="isChecked"
                            defaultChecked={network.active}
                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  )
}
VariantPage.getLayout = getAdminLayout
export default VariantPage
