import LoadingIndicator from '@/components/LoadingIndicator'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  Text,
} from '@chakra-ui/react'
import config from 'config'
import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import ReactSelect, { AriaOnFocus, components } from 'react-select'
import useSWR from 'swr'
import { getFetcher } from '../../../../hooks/useFetcher'

type Option = {
  label: string
  value: any
}
const getKeyUrl = (phone?: string) => {
  return config.api.shippingAddress.search.findByPhoneLike(phone)
}

const Control = ({ children, ...props }: any) => {
  return (
    <components.Control {...props}>
      <Text
        as="span"
        mx={2}
      >
        🚀
      </Text>
      {children}
    </components.Control>
  )
}

let count = 0

const fetcher = getFetcher()
const PhoneSelect = ({
  defaultValue,
  setAddress,
  setPhone,
  currentAddress,
}: {
  defaultValue?: string
  setAddress: (address?: any) => void
  setPhone: (phone?: string) => void
  currentAddress?: any
}) => {
  const {
    register,
    setValue,
    formState: { errors, isDirty },
    resetField,
    watch,
  } = useForm({
    defaultValues: {
      phone: '',
    },
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<Option>()
  const [keyUrl, setKeyUrl] = useState<string>(getKeyUrl(''))
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [ariaFocused, setAriaFocused] = useState<{
    option?: Option | null
    message?: string
  } | null>()
  const { data } = useSWR(keyUrl, fetcher)
  const phone = watch('phone')
  const {} = register('phone', {
    required: 'Đừng để trống số điện thoại nha',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Số điện thoại bao gồm 10 chữ số',
    },
  })
  useEffect(() => {
    setIsLoading(true)
    const id = setTimeout(() => {
      if (phone) setKeyUrl(getKeyUrl(phone))
      else setIsLoading(false)
    }, 500)
    return () => {
      clearTimeout(id)
    }
  }, [phone])

  useEffect(() => {
    if (data) setIsLoading(false)
  }, [data])

  const items: Option[] = useMemo(() => {
    return data?._embedded.shippingAddresses.map((add: any) => ({
      label: add.phone,
      value: add,
    }))
  }, [data])

  const handleInputChange = (newValue: any, meta: any) => {
    console.log(meta)
    switch (meta.action) {
      case 'input-change': {
        setValue('phone', newValue, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
        if (selected) {
          setSelected(null)
          setAddress(null)
        }
        break
      }
      case 'input-blur': {
        setPhone(phone)
        break
      }
      case 'menu-close': {
        break
      }
    }
  }

  const onKeyDown = (event: any) => {
    // Allow only digits and some keys like backspace and delete
    if (
      (!/^\d$/.test(event.key) || event.target.value.length === 10) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      event.preventDefault()
    }
  }

  const handleSelectChange = (newOption: any, meta: any) => {
    console.log('select change meta', meta)
    switch (meta.action) {
      case 'select-option': {
        resetField('phone')
        setAddress(newOption.value)
        setSelected(newOption)
        break
      }
      case 'clear': {
        if (selected) {
          setSelected(null)
          setAddress(null)
        }
      }
    }
  }

  const onFocus: AriaOnFocus<Option> = ({ focused }) => {
    const message = ` - ${focused.value.name}`
    setTimeout(() => {
      setAriaFocused({ option: focused, message })
    }, 50)
    return message
  }
  const errorMessageHeight = errors.phone ? 'auto' : 15

  return (
    <FormControl
      h="200px"
      isRequired
      isInvalid={errors.phone != undefined}
    >
      <FormLabel>Số điện thoại</FormLabel>

      <ReactSelect
        instanceId={'phone-select'}
        aria-labelledby="aria-label"
        ariaLiveMessages={{
          onFocus,
        }}
        value={selected}
        onKeyDown={onKeyDown}
        isLoading={isLoading}
        options={items}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        inputValue={phone}
        isSearchable
        isClearable
        tabSelectsValue={true}
        placeholder="Nhập số điện thoại"
        components={{
          LoadingIndicator,
          Control,
        }}
        loadingMessage={() => `Đang tìm đây chờ chút xíu nha...`}
        noOptionsMessage={() => `Không tìm thấy khách hàng`}
        blurInputOnSelect
        getOptionLabel={(option) =>
          `${option.label}${
            isMenuOpen && ariaFocused?.option === option
              ? ariaFocused.message
              : ''
          }`
        }
        onMenuOpen={setIsMenuOpen.bind(this, true)}
        onMenuClose={setIsMenuOpen.bind(this, false)}
      />

      <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default PhoneSelect
