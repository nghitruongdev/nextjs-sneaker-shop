import {
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Spinner,
  Button,
} from '@chakra-ui/react'
import config from 'config'
import { useRef, useState, useEffect, useMemo, memo } from 'react'
import { useForm } from 'react-hook-form'
import UserOrderHistory from './UserOrderHistory'
import { getFetcher } from '../../../hooks/useFetcher'
import AsyncSelect from 'react-select/async'
import useAxios from '@/hooks/useAxios'
import ReactSelect, {
  AriaOnFocus,
  components as SelectComponents,
} from 'react-select'
import useSWR from 'swr'
import PhoneSelect from './PhoneSelect'

type ShippingAddressForm = {
  name: string | null
  phone?: string
  email?: string
  selectAddress?: any
}

const defaultShippingAddress: ShippingAddressForm = {
  name: null,
}
const fetcher = getFetcher()
const ShippingAddressForm = () => {
  const [currentTimeout, setCurrentTimeout] = useState<any>()
  const { register, watch, getValues, setValue, reset, resetField } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultShippingAddress,
  })
  const [selectAddress] = watch(['selectAddress'])
  useEffect(() => {
    if (selectAddress) {
      const { name, phone, email } = selectAddress
      // reset({ name, phone, email })
      setValue('name', name)
      setValue('phone', phone)
      setValue('email', email)
    } else {
      reset(defaultShippingAddress)
    }
  }, [selectAddress, getValues, reset, setValue])
  // const [selectAddress] = watch(['selectAddress'])
  // console.log(selectAddress)
  return (
    <Card p={5}>
      <CardHeader>Thông tin giao hàng</CardHeader>
      <CardBody>
        <Button>Đặt lại</Button>
        <FormControl as="fieldset">
          <FormLabel as="legend">Thông tin liên hệ</FormLabel>

          <FormControl isRequired>
            <FormLabel>Họ tên người nhận</FormLabel>
            <Input
              type="text"
              {...register('name')}
            />
          </FormControl>

          <PhoneSelect
            defaultValue={getValues('phone')}
            setAddress={setValue.bind(this, 'selectAddress')}
            setPhone={setValue.bind(this, 'phone')}
            currentAddress={selectAddress}
          />

          <FormControl>
            <FormLabel>Địa chỉ email</FormLabel>
            <Input
              type="email"
              {...register('email')}
            />
          </FormControl>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Địa chỉ</FormLabel>
          <HStack align={'self-end'}>
            <FormControl>
              <FormLabel>Tỉnh/ thành phố</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Quận/ huyện</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Xã/ phường</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>Địa chỉ nhà</FormLabel>
            <Input type="email" />
          </FormControl>
        </FormControl>
        {getValues('phone') && (
          <Card mt={5}>
            <CardBody>
              <Accordion
                allowToggle
                overflow={'scroll'}
                maxH={'300px'}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                      >
                        <Text textAlign="center">
                          Lịch sử đặt hàng :{' '}
                          <Text
                            as="span"
                            fontWeight="bold"
                          >
                            {getValues('phone')}
                          </Text>
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <UserOrderHistory phoneNumber={getValues('phone')} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        )}
      </CardBody>
    </Card>
  )
}
export default ShippingAddressForm
