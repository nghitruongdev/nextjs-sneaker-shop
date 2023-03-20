import { Address } from '@/domain/Address'
import { Input } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'

const defaultAddress: Address = {
  id: 0,
  street: '',
  ward: '',
  district: '',
  province: '',
}
type AddressKey = keyof Address
type Option = { label: string; value: any }
const useAddressForm = () => {
  const { control, ...form } = useForm({
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
  const toOptions = (items: any[]): Option[] =>
    items.map((item) => ({
      label: item,
      value: item,
    }))

  const inputs = {
    id: <></>,
    street: <Input type="text" />,
    ward: controller(
      'ward',
      toOptions(['Cam An Nam', 'Cam An Bắc', 'Cam Phúc Đông'])
    ),
    district: controller(
      'district',
      toOptions(['Cam Ranh', 'Cam Lâm', 'Quận 1', 'Quận 3'])
    ),
    province: controller(
      'province',
      toOptions(['Khánh Hoà', 'Phú Quốc', 'Thành phố Sài Gòn', 'Ninh Hoà'])
    ),
  }

  const getInput = (name: AddressKey) => inputs[name]
  return {
    form,
    getInput,
  }
}
export default useAddressForm
