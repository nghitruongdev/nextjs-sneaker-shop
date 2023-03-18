import LoadingIndicator from '@/components/LoadingIndicator'
import useAxios from '@/hooks/useAxios'
import { getFetcher } from '@/hooks/useFetcher'
import variants from '@/pages/admin/products/variants'
import {
  HStack,
  FormControl,
  FormLabel,
  Select,
  Button,
  Avatar,
  Box,
  useRadioGroup,
  useRadio,
  UseRadioProps,
  Tooltip,
} from '@chakra-ui/react'
import config from 'config'
import { useReducer, useEffect, useState, useMemo } from 'react'
import AsyncSelect from 'react-select/async'
import useSWR from 'swr'
import { Badge } from '@chakra-ui/react'
import { ProductOption } from '@/domain/ProductOption'
import { OptionValue } from '../../../domain/ProductOption'
import { ProductVariant } from '@/domain/ProductVariant'

type Option = {
  label: string
  value: any
}

enum ActionType {
  SET_VARIANT_URL,
  SET_OPTION_URL,
  SET_PRODUCT,
  UPDATE_SELECTED_OPTION,
}

interface ReducerAction {
  type: ActionType
  payload: any
}

interface ReducerState {
  variantUrl: string | null
  optionUrl: string | null
  product: any
  selectedValues: OptionValue[]
}

const productReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  const { type, payload } = action
  switch (type) {
    case ActionType.SET_PRODUCT: {
      const _links = payload?._links
      return {
        ...state,
        product: payload,
        optionUrl: _links?.options?.href,
        variantUrl: _links?.variants?.href,
      }
    }
    case ActionType.UPDATE_SELECTED_OPTION: {
      const { value } = payload
      const { selectedValues: selectedValues } = state
      const idx = selectedValues.findIndex(
        (selected) =>
          selected._links.productOption.href === value._links.productOption.href
      )
      if (idx === -1) {
        selectedValues.push(value)
      } else {
        selectedValues[idx] = value
      }
      return {
        ...state,
        selectedValues: [...selectedValues],
      }
    }
  }
  return state
}

const inititalState: ReducerState = {
  variantUrl: null,
  optionUrl: null,
  product: null,
  selectedValues: [],
}
const fetcher = getFetcher()

const ProductSelect = () => {
  const [state, dispatch] = useReducer(productReducer, inititalState)
  const [currentTimeout, setCurrentTimeout] = useState<any>()
  const { get } = useAxios()

  const { variantUrl, optionUrl, product, selectedValues } = state

  const { data: variantsData } = useSWR(variantUrl, fetcher)
  const { data: optionsData } = useSWR(optionUrl, fetcher)

  console.log('selectedOptionValues', selectedValues)
  const options: ProductOption[] | undefined =
    optionsData?._embedded.productOptions

  const variants: ProductVariant[] | undefined = useMemo(
    () => variantsData?._embedded.productVariants,
    [variantsData]
  )
  const filteredVariantOptionValues: OptionValue[] = useMemo(() => {
    let filteredValues: OptionValue[] | undefined

    let filteredVariants = variants
    //* if there are values selected, filter variants contains value belong to option selected
    if (selectedValues.length && variants) {
      console.log('selected option values length > 0')
      const getOptionLink = (item: OptionValue) =>
        item._links?.productOption.href

      const selectedOptionLinks = selectedValues.map((value) =>
        getOptionLink(value)
      )
      console.log('selectedOptionLinks', selectedOptionLinks)

      const isValueSelected = (item: OptionValue) => {
        return selectedValues.find((value) => value.id === item.id)
      }
      const isValueOptionSelected = (item: OptionValue) =>
        selectedOptionLinks.some((link) => link === getOptionLink(item))

      filteredVariants = variants.filter((variant) =>
        variant.optionValues.every((value) => !isValueOptionSelected(value))
      )
      console.log('filteredVariants', filteredVariants.length)
    }

    filteredValues = filteredVariants?.flatMap((v) => v.optionValues)
    return filteredValues ? filteredValues : []
  }, [variants, selectedValues])

  const getFilteredValues = (option: ProductOption): OptionValue[] => {
    let values: OptionValue[] = []
    if (option.values && variants) {
      console.log('filteredVariantOptionValues', filteredVariantOptionValues)
      // *filter to get value of this options that are available in variants
      values = option.values.filter((value) =>
        filteredVariantOptionValues.find((filtered) => value.id === filtered.id)
      )
    }

    return values
  }

  const getProducts = async (inputValue?: string) => {
    const response = await get({
      requestUrl: config.api.products.search.findByNameLike(inputValue),
    })
    if (!response?.status) return []
    return response.data._embedded.products.map((p: any) => ({
      label: p.name,
      value: p,
    }))
  }

  const updateSelectedOptionValues = (value: OptionValue) => {
    dispatch({
      type: ActionType.UPDATE_SELECTED_OPTION,
      payload: {
        value,
      },
    })
  }

  const handleSelectChange = (option: any, meta: any) => {
    dispatch({ type: ActionType.SET_PRODUCT, payload: option?.value })
  }

  const loadOptions = (input?: string) =>
    new Promise<Option[]>((resolve) => {
      if (currentTimeout) clearTimeout(currentTimeout)
      const id = setTimeout(() => {
        return resolve(getProducts(input))
      }, 300)
      setCurrentTimeout(id)
    })

  return (
    <>
      <HStack
        align="center"
        spacing={3}
      >
        <FormControl isRequired>
          <FormLabel>Tên sản phẩm</FormLabel>

          <AsyncSelect
            instanceId="product-select"
            cacheOptions
            placeholder="Tên sản phẩm"
            loadOptions={loadOptions}
            loadingMessage={() => `Đang tìm sản phẩm ...`}
            noOptionsMessage={() => `Không tìm thấy sản phẩm`}
            isSearchable
            isClearable
            components={{ LoadingIndicator }}
            onChange={handleSelectChange}
          />
        </FormControl>

        <FormControl
          w="200px"
          isRequired
        >
          <FormLabel>Số lượng</FormLabel>
          <Select placeholder="Số lượng">
            {Array(10)
              .fill('')
              .map((item, idx) => (
                <option
                  key={idx}
                  value={idx + 1}
                >
                  {idx + 1}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button
          alignSelf="end"
          colorScheme="blackAlpha"
          w="200px"
          p="15px"
        >
          Thêm vào giỏ
        </Button>
      </HStack>
      {options &&
        options.map((option: ProductOption) => (
          <Box
            key={option.type.name}
            borderColor={'gray.300'}
            borderWidth="1px"
            p={3}
            rounded={5}
            mt={5}
          >
            <FormControl>
              <FormLabel>{option.type.name}</FormLabel>
              <ProductOptionGroup
                option={option}
                filteredValues={getFilteredValues(option)}
                updateSelectedOptionValue={updateSelectedOptionValues}
              />
            </FormControl>
          </Box>
        ))}
    </>
  )
}

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { ...radioProps } = props
  const { state, htmlProps, getInputProps, getCheckboxProps, getLabelProps } =
    useRadio(radioProps)

  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const isDisabled = radioProps.isDisabled
  return (
    <Box as="label">
      <input {...input} />
      <Tooltip
        hasArrow
        label={isDisabled ? 'Sản phẩm hết hàng' : ''}
      >
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          _disabled={{
            bg: 'gray.50',
            color: 'gray.500',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Tooltip>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const ProductOptionGroup = ({
  option,
  filteredValues,
  updateSelectedOptionValue,
}: {
  option: ProductOption
  filteredValues: OptionValue[]
  updateSelectedOptionValue: (optionValue: OptionValue) => void
}) => {
  const values = option?.values
  const handleRadioChange = (next: string) => {
    const selected = filteredValues.find(
      (filtered) => filtered.id + '' === next
    )
    if (selected) updateSelectedOptionValue(selected)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: option?.type?.name,
    onChange: handleRadioChange,
  })
  const group = getRootProps()
  return (
    <>
      {values && (
        <HStack {...group}>
          {values.map((optionValue) => {
            const radio = getRadioProps({
              value: `${optionValue.id}`,
              isDisabled:
                filteredValues.findIndex(
                  (filtered) => filtered.id === optionValue.id
                ) === -1,
            })
            return (
              <RadioCard
                key={optionValue.id}
                {...radio}
              >
                {optionValue.name}
              </RadioCard>
            )
          })}
        </HStack>
      )}
    </>
  )
}

export default ProductSelect
