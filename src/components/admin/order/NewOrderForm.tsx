import UserOrderHistory from '@/components/admin/order/UserOrderHistory'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { StringDecoder } from 'string_decoder'
import ShippingAddressForm from './ShippingAddressForm'
import useSWR from 'swr'
import AsyncSelect from 'react-select/async'
import LoadingIndicator from '@/components/LoadingIndicator'
import useAxios from '@/hooks/useAxios'
import config from 'config'
import { useEffect, useReducer, useState } from 'react'
import { getFetcher } from '../../../hooks/useFetcher'
import { setTimeout } from 'timers'
import ProductSelect from './ProductSelect'

const NewOrderForm = () => {
  return (
    <>
      <SimpleGrid
        columns={{
          lg: 2,
        }}
        minH="100vh"
      >
        <ShippingAddressForm />
        <Card>
          <CardBody>
            <ProductSelect />
            <Box
              mt={5}
              borderWidth={'1px'}
              borderColor="gray.300"
              p={5}
              rounded={5}
            >
              <Heading>Giỏ hàng</Heading>
              <ItemTable />
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  )
}

const ItemTable = () => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}

export default NewOrderForm
