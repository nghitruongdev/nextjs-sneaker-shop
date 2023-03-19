import { Address } from '@/domain/Address'
import { Input } from '@chakra-ui/react'
import { Control, Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { User } from '../domain/User'

const defaultAddress: Address = {
  id: 0,
  street: '',
  ward: '',
  district: '',
  province: '',
}
type AddressKey = keyof Address
type Option = { label: string; value: any }
const useShippingAddress = () => {
  const { register, control, getValues } = useForm({
    defaultValues: defaultAddress,
  })

  const controller = (name: AddressKey, options: any) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactSelect
          {...field}
          options={options}
        />
      )}
    />
  )

  const streetInput = <Input type="text" />
  const wardSelect = controller(
    'ward',
    ['Cam An Nam', 'Cam An Bắc', 'Cam Phúc Đông'].map((item) => ({
      label: item,
      value: item,
    }))
  )
  const districtSelect = controller(
    'district',
    ['Cam Ranh', 'Cam Lâm', 'Quận 1', 'Quận 3'].map((item) => ({
      label: item,
      value: item,
    }))
  )
  const provinceSelect = controller(
    'province',
    ['Khánh Hoà', 'Phú Quốc', 'Thành phố Sài Gòn', 'Ninh Hoà'].map((item) => ({
      label: item,
      value: item,
    }))
  )

  return {
    getAddress: getValues,
    inputs: {
      streetInput,
      wardSelect,
      districtSelect,
      provinceSelect,
    },
  }
}
export default useShippingAddress
