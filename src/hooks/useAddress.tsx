import { Address } from '@/domain/Address'
import { Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Controller, useForm, UseFormReset } from 'react-hook-form'
import ReactSelect from 'react-select'

export type AddressForm = {
  id: number
  street: string
  ward: Option | null
  district: Option | null
  province: Option | null
}
type Option = { label: string; value: any }
const toOptions = (...items: any[]): Option[] =>
  items.map((item) => ({
    label: item,
    value: item,
  }))

const resetForm = (reset: UseFormReset<AddressForm>, data?: Address | null) => {
  if (data) {
    const { id, street, ward, district, province } = data
    reset({
      id,
      street,
      ward: (ward && toOptions(ward)[0]) || null,
      district: (district && toOptions(district)[0]) || null,
      province: (province && toOptions(province)[0]) || null,
    })
  }
}
const useAddressForm = ({ address }: { address?: Address | null }) => {
  const { control, register, reset, ...form } = useForm<AddressForm>({})

  useEffect(() => {
    if (address) {
      resetForm(reset, address)
    }
  }, [address, reset])

  const controller = (name: keyof Address, options: any) => (
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

  const inputs = {
    id: (
      <input
        type={'hidden'}
        {...register('id')}
      />
    ),
    street: (
      <Input
        type="text"
        {...register('street')}
      />
    ),
    ward: controller(
      'ward',
      toOptions(...['Cam An Nam', 'Cam An Bắc', 'Cam Phúc Đông'])
    ),
    district: controller(
      'district',
      toOptions(...['Cam Ranh', 'Cam Lâm', 'Quận 1', 'Quận 3'])
    ),
    province: controller(
      'province',
      toOptions(...['Khánh Hoà', 'Phú Quốc', 'Thành phố Sài Gòn', 'Ninh Hoà'])
    ),
  }

  const getInput = (name: keyof Address) => inputs[name]
  return {
    getInput,
    form: {
      ...form,
      resetAddressForm: resetForm.bind(null, reset),
    },
  }
}
export default useAddressForm
