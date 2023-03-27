import {
  Box,
  Input,
  InputProps,
  Textarea,
  Text,
  TextareaProps,
  Badge,
} from '@chakra-ui/react'
import { useEffect, useState, useReducer, useMemo } from 'react'
import { Controller, useForm, UseFormReset } from 'react-hook-form'
import useAxios from './useAxios'
import useMyToast from '@/hooks/useMyToast'
import Product from '@/domain/Product'
import SelectPopout from '../components/SelectPopout'
import { getFetcher } from './useFetcher'
import config from 'config'
import useSWR from 'swr'
import { OptionType } from '../domain/ProductOption'
import { CreatableSelect, MultiValue, Select } from 'chakra-react-select'
import { ActionMeta } from 'react-select'
import { Discount } from '@/domain/Discount'
import { SelectOption } from '@/components/ReactSelectOption'
import optionReducer, {
  initialState,
} from '@/components/reducers/selectProductOptionReducer'
import { Brand } from '@/domain/Brand'

export type ProductFormValue = {
  id: number | undefined
  name: string | undefined
  shortDesc: string | undefined
  fullDesc: string | undefined
  minPrice: number | undefined
  images: string[] | undefined
  publishDate: Date | undefined
  status: string | undefined
  attributes: any[] | undefined
  optionTypes: SelectOption[] | undefined
  collection: SelectOption | undefined
  brand: SelectOption | undefined
  category: SelectOption | undefined
  discount: SelectOption | undefined
  productOptions: SelectOption[]
}

export type ProductInputs = {
  [key in keyof ProductFormValue]: (props?: any) => JSX.Element
}

const resetForm = (reset: UseFormReset<ProductFormValue>, data?: Product) => {
  reset({
    // id: data?.id,
    // login: data?.login,
    // firstName: data?.firstName,
    // lastName: data?.lastName,
    // email: data?.email,
    // phone: data?.phone,
    // birthdate: data?.birthdate || null,
    // gender: toGender(data?.gender as keyof typeof Gender),
    // note: data?.note,
    // imageFile: null,
  })
}

const useProductForm = ({ current }: { current?: Product }) => {
  const [state, dispatch] = useReducer(optionReducer, initialState)
  const { get } = useAxios()
  const { fail } = useMyToast()

  const { types, options } = state

  const { optionTypes, discounts, brands } = useData()

  const form = useForm<ProductFormValue>({
    mode: 'onBlur',
    // reValidateMode: 'onChange',
  })

  const {
    register,
    reset,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (current) resetForm(reset, current)
  }, [current, reset])

  const typeChangeHandler = (
    data: MultiValue<SelectOption>,
    event: ActionMeta<any>
  ) => {
    switch (event.action) {
      case 'select-option': {
        dispatch({
          type: ActionType.ADD_NEW_TYPE,
          payload: { type: event.option },
        })
        break
      }
      case 'remove-value': {
        dispatch({
          type: ActionType.REMOVE_TYPE,
          payload: { typeId: event.removedValue.value.id },
        })
        break
      }
    }
  }
  const updateOptionValue = (
    type: OptionType,
    data: MultiValue<SelectOption>,
    event: ActionMeta<any>
  ) => {
    switch (event.action) {
      case 'create-option':
      case 'remove-value':
      case 'clear':
      case 'select-option': {
        dispatch({
          type: ActionType.UPDATE_OPTION_VALUE,
          payload: { type, values: data },
        })
      }
    }
  }

  const inputs: ProductInputs = {
    id: () => <></>,
    name: (props?: InputProps) => (
      <Input
        {...register('name')}
        {...props}
      />
    ),
    shortDesc: (props?: InputProps) => (
      <Input
        {...register('shortDesc')}
        {...props}
      />
    ),
    fullDesc: () => <Textarea {...register('fullDesc')} />,
    minPrice: () => (
      <Input
        type="number"
        inputMode="decimal"
        {...register('minPrice')}
      />
    ),
    images: () => <>Images input</>,
    publishDate: () => (
      <Input
        type="datetime-local"
        {...register('publishDate', {
          valueAsDate: true,
          validate: {
            min: (value) => {
              const time = value?.getTime()
              if (!time) {
                return
              }
              return (
                (value && time >= Date.now()) ||
                'Thời gian công bố sản phẩm phải sau thời điểm hiện tại.'
              )
            },
          },
        })}
      />
    ),
    status: () => <>status input</>,
    optionTypes: () => (
      <>
        <Controller
          control={control}
          name={'optionTypes'}
          render={({ field }) => (
            <>
              <Select
                {...field}
                placeholder="Thêm lựa chọn"
                options={optionTypes}
                colorScheme="purple"
                variant="filled"
                tagVariant="solid"
                value={types}
                onChange={typeChangeHandler}
                isSearchable
                isMulti
                isClearable={false}
                backspaceRemovesValue={false}
              />
              {!!options?.length &&
                options
                  ?.filter(({ type }) =>
                    types.some((item) => item.value.id === type.id)
                  )
                  .map(({ type, values }) => (
                    <Box
                      key={type.id}
                      m="2"
                    >
                      <Text fontWeight={'bold'}>{type.name}</Text>
                      <CreatableSelect
                        components={{ DropdownIndicator: null }}
                        placeholder={`Thêm ${type.name?.toLowerCase()}`}
                        size="sm"
                        variant="flushed"
                        colorScheme="blue"
                        isMulti
                        isSearchable
                        backspaceRemovesValue={false}
                        onChange={updateOptionValue.bind(null, type)}
                        value={values}
                        // onCreateOption={}
                      />
                    </Box>
                  ))}
            </>
          )}
        />
      </>
    ),
    discount: () => (
      <SelectPopout
        controller={{
          name: 'discount',
          control: control,
        }}
        stateLabel={{
          defaultEmpty: `Chọn giảm giá`,
          onSelected: (value) => `Giảm giá: ${value}`,
        }}
        props={{
          options: discounts,
          noOptionsMessage: 'Không có giảm giá.',
          formatOptionLabel: (data, meta) => {
            const dc = data.value as Discount
            return (
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Text noOfLines={2}>{dc.code}</Text>
                <Text
                  as="span"
                  ml="2"
                >
                  <Badge
                    colorScheme={'green'}
                    variant="solid"
                  >
                    {dc.percentage}%
                  </Badge>
                </Text>
              </Box>
            )
          },
        }}
      />
    ),
    brand: () => (
      <SelectPopout
        controller={{
          name: 'brand',
          control,
        }}
        stateLabel={{
          defaultEmpty: `Chọn nhãn hàng`,
        }}
        props={{
          options: brands,
        }}
      />
    ),
    collection: () => (
      <SelectPopout
        controller={{
          name: 'collection',
          control,
        }}
        stateLabel={{
          defaultEmpty: `Chọn  bộ sưu tập`,
        }}
        props={{}}
      />
    ),
    category: () => (
      <SelectPopout
        controller={{
          name: 'category',
          control,
        }}
        stateLabel={{
          defaultEmpty: `Chọn  danh mục hàng`,
        }}
        props={{}}
      />
    ),
    attributes: () => <>attributes input</>,
  }
  return {
    inputs,
    resetForm: resetForm.bind(null, reset),
    errors,
    handleSubmit,
    isSubmitting,
    watch,
  }
}

const fetcher = getFetcher()
const now = new Date(Date.now())
const toOption = (label: string, value: any): SelectOption => ({ label, value })

const useData = () => {
  const { data: optionTypesData } = useSWR(
    config.api.products.options.type.search.findAllWithoutPage,
    fetcher
  )

  const optionTypes = useMemo(
    () =>
      optionTypesData?._embedded.optionTypes.map((type: OptionType) =>
        toOption(type.name, type)
      ),
    [optionTypesData]
  )

  const { data: discountData } = useSWR(
    config.api.products.discounts.search.findAllByEndTimeAfter(now),
    fetcher
  )

  const discounts = useMemo(
    () =>
      discountData?._embedded.discounts.map((dc: Discount) =>
        toOption(dc.code, dc)
      ),
    [discountData]
  )

  const { data: brandsData } = useSWR(
    config.api.products.brands.search.findAllWithoutPage,
    fetcher
  )

  const brands = useMemo(
    () =>
      brandsData?._embedded.brands.map((br: Brand) => toOption(br.name, br)),
    [brandsData]
  )

  return { optionTypes, discounts, brands }
}

export default useProductForm
