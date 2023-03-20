import { getFetcher } from '@/hooks/useFetcher'
import {
  HStack,
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
  Box,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { useReducer, useEffect, useState, useMemo } from 'react'
import useSWR from 'swr'
import { OptionValue, ProductOption } from '../../../../domain/ProductOption'
import { ProductVariant } from '@/domain/ProductVariant'
import { ActionMeta, SingleValue } from 'react-select'
import {
  ActionType,
  productReducer,
  inititalState,
  ReducerAction,
} from '../reducers/ProductSelectReducer'
import ProductOptionGroup from './ProductOptionGroup'
import ProductSelect, { Option } from './ProductSelect'
import Product from '@/domain/Product'
import OrderQuantitySelect from './OrderQuantitySelect'
import CartList from './CartList'
import Items from '@/components/layout/admin/sidebar/Items'

const dispatchActionFactory = (dispatch: (value: ReducerAction) => void) => {
  const updateSelectedOptionValues = (value: OptionValue) => {
    dispatch({
      type: ActionType.UPDATE_SELECTED_OPTION,
      payload: {
        value,
      },
    })
  }
  const removeSelectedOption = (option: ProductOption) => {
    dispatch({
      type: ActionType.REMOVE_SELECTED_OPTION,
      payload: { option },
    })
  }
  const clearSelectedOptionValues = () => {
    dispatch({
      type: ActionType.CLEAR_SELECTED_OPTION,
      payload: {},
    })
  }
  return {
    updateSelectedOptionValues,
    removeSelectedOption,
    clearSelectedOptionValues,
  }
}

type CartItem = {
  variant: ProductVariant
  product: Product
  quantity: number
}

const fetcher = getFetcher()

const CartForm = () => {
  const [{ selectedValues }, dispatch] = useReducer(
    productReducer,
    inititalState
  )
  const [product, setProduct] = useState<Product | null>(null)
  const [variant, setVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // add to cart
  const handleAddItemToCart = () => {
    if (!variant || !product || !quantity) {
      return ;
    }
    // tim vi tri co item.variant hien tai
    // const idx = cartItems.filter((item) => variant.id === item.variant.id)
      const newItem: CartItem = {
        variant,
        product,
        quantity,
      }
      setCartItems((oldItems) => {
        const filterItems = oldItems.filter((item) => variant.id != item.variant.id)
        filterItems.unshift(newItem);
        return [...filterItems];
      })

    // setProduct(null);
    // setVariant(null);
    // setQuantity(1);
  }
  console.log('Cart', cartItems);
  // const arr = ['Bob', 'John', 'Alice', 'Annie', 'Wick', 'Charlie'];
  // const fil = arr.filter((item) => item ) // chia lay phan du // la khong phai 0;
  // console.log("abc", fil);
  const {
    updateSelectedOptionValues,
    removeSelectedOption,
    clearSelectedOptionValues,
  } = dispatchActionFactory(dispatch)

  const { variants, options } = useData({ product })

  const { getFilteredValues } = useFilterOptionValues({
    variants,
    selectedValues,
  })

  // * update variant
  useEffect(() => {
    if (selectedValues.length === options?.length) {
      const isSelectedValue = (value: OptionValue) => {
        return selectedValues.some((v) => v.id === value.id)
      }
      const isAllValueSelected = (variant: ProductVariant) => {
        return variant.optionValues.every(isSelectedValue)
      }

      const selectedVariant = variants?.find(isAllValueSelected)
      setVariant(selectedVariant ? selectedVariant : null)
      return
    }
    if (variant) setVariant(null)
  }, [product, options, selectedValues, variants, variant])

  const handleSelectProductChange = (
    option: SingleValue<Option>,
    meta: ActionMeta<Option>
  ) => {
    setProduct(option?.value)
    if (meta.action === 'clear' && selectedValues.length) {
      clearSelectedOptionValues()
    }
  }

  return (
    <Box h="full">
      <HStack
        spacing={3}
        align="flex-start"
        wrap={{
          md: 'wrap',
          lg: 'nowrap',
        }}
        // bg={{
        //   base: 'aqua',
        //   sm: 'yellow',
        //   md: 'red',
        //   lg: 'blue',
        //   xl: ' green',
        // }}
      >
        <FormControl
          isRequired
          flexGrow={1}
        >
          <FormLabel noOfLines={1}>Tên sản phẩm</FormLabel>
          <ProductSelect onSelectChange={handleSelectProductChange} />
        </FormControl>

        <Stack
          direction={{
            sm: 'row',
            md: 'column',
          }}
        >
          <FormControl isRequired>
            <FormLabel>Số lượng</FormLabel>
            <OrderQuantitySelect
              quantity={quantity}
              updateQuantity={setQuantity}
              availableQty={variant?.availableQuantity}
            />
          </FormControl>
          <Button
            alignSelf="end"
            colorScheme="blue"
            w="200px"
            p="15px"
            {...((!variant || !quantity) && {
              isDisabled: true,
              colorScheme: 'blackAlpha',
            })}
            onClick={handleAddItemToCart}
          >
            Thêm vào giỏ
          </Button>
        </Stack>
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
                removeSelectedOption={removeSelectedOption.bind(this, option)}
                option={option}
                filteredValues={getFilteredValues(option)}
                updateSelectedOptionValue={updateSelectedOptionValues}
              />
            </FormControl>
          </Box>
        ))}

      {/*Giỏ hàng  */}
      <Box
        mt={5}
        borderWidth={'1px'}
        borderColor="gray.300"
        p={5}
        rounded={5}
        maxH="500px"
        overflow="hidden"
        overflowY="scroll"
      >
        <Heading
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Giỏ hàng <Button mt={5}>Đặt hàng</Button>
          <Flex></Flex>
        </Heading>

        <CartList />
      </Box>
    </Box>
  )
}

const useData = ({ product }: { product: Product | null | undefined }) => {
  const { data: variantsData } = useSWR(product?._links?.variants.href, fetcher)
  const { data: optionsData } = useSWR(product?._links?.options.href, fetcher)

  const options: ProductOption[] | undefined = useMemo(() => {
    return optionsData?._embedded.productOptions
  }, [optionsData])

  const variants: ProductVariant[] | undefined = useMemo(
    () => variantsData?._embedded.productVariants,
    [variantsData]
  )
  return {
    variants,
    options,
  }
}

const useFilterOptionValues = ({
  variants,
  selectedValues,
}: {
  variants?: ProductVariant[]
  selectedValues?: OptionValue[]
}) => {
  // * filter variant option values
  const filteredVariantOptionValues: OptionValue[] = useMemo(() => {
    let filteredValues: OptionValue[] | undefined = []
    let filteredVariants = variants
    let excludedValues: OptionValue[] = []

    const isValueSelected = (item: OptionValue) => {
      return selectedValues?.some((value) => item.id === value.id)
    }

    filteredVariants = filteredVariants?.filter((variant) => variant.enabled)

    if (selectedValues?.length && variants) {
      excludedValues = variants
        .filter(
          (variant) =>
            !variant.enabled && variant.optionValues.some(isValueSelected)
        )
        .flatMap((variant) => variant.optionValues)
        .filter((item) => !isValueSelected(item))
    }

    filteredValues = [
      ...filteredValues,
      ...(filteredVariants?.flatMap((v) => v.optionValues) || []),
    ].filter(
      (value) => !excludedValues.some((exValue) => exValue.id === value.id)
    )
    return filteredValues
  }, [variants, selectedValues])

  const getFilteredValues = (option: ProductOption): OptionValue[] => {
    let values: OptionValue[] = []
    if (option.values && variants) {
      // console.log('filteredVariantOptionValues', filteredVariantOptionValues)
      // *filter to get value of this options that are available in variants
      values = option.values.filter((value) =>
        filteredVariantOptionValues.find((filtered) => value.id === filtered.id)
      )
    }
    return values
  }
  return {
    getFilteredValues,
  }
}
export default CartForm

// select * from product_variant_option_value pvov join product_variant pv on pvov.variant_id = pv.id
// join product_option_value pov on pov.id = pvov.option_value_id
