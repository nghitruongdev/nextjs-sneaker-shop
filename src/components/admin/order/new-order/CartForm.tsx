import { getFetcher } from '@/hooks/useFetcher'
import {
  HStack,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Box,
  Heading,
  Stack,
  VStack,
  StackDivider,
} from '@chakra-ui/react'
import { useReducer, useEffect, useState, useMemo } from 'react'
import useSWR from 'swr'
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
import CartItem, { CartItemType } from './CartItem'
import config from 'config'
import { OptionType, ProductOption } from '@/domain/ProductOption'

const dispatchActionFactory = (dispatch: (value: ReducerAction) => void) => {
  const updateSelectedOption = (value: ProductOption) => {
    dispatch({
      type: ActionType.UPDATE_SELECTED_OPTION,
      payload: {
        value,
      },
    })
  }
  const removeOptionType = (type: OptionType) => {
    dispatch({
      type: ActionType.REMOVE_OPTION_TYPE,
      payload: { type },
    })
  }
  const clearSelectedOptions = () => {
    dispatch({
      type: ActionType.CLEAR_SELECTED_OPTION,
      payload: {},
    })
  }
  return {
    updateSelectedOption,
    removeOptionType,
    clearSelectedOptions,
  }
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
  const [cartItems, setCartItems] = useState<CartItemType[]>([])

  // remove from cart
  // const handleRemoveFromCart = (idx : CartItemType) => {
  //     const found = cartItems.findIndex((item) => item.variant.id === idx.variant.id)
  //     setCartItems((oldCartItem) => {
  //       oldCartItem.splice(found, 1);
  //       return [...oldCartItem];
  //     });
  // }
  const handleRemoveFromCart = (variantID: number) => {
    setCartItems((oldCartItem) => {
      const filterItems = oldCartItem.filter(
        (item) => variantID !== item.variant.id
      )
      return [...filterItems]
    })
  }
  // add to cart
  const handleAddItemToCart = () => {
    if (!variant || !product || !quantity) {
      return
    }
    const newItem: CartItemType = {
      variant,
      product,
      quantity,
    }
    setCartItems((oldItems) => {
      const filterItems = oldItems.filter(
        (item) => variant.id != item.variant.id
      )
      filterItems.unshift(newItem)
      return [...filterItems]
    })
  }
  const { updateSelectedOption, removeOptionType, clearSelectedOptions } =
    dispatchActionFactory(dispatch)

  const { variants, options, types } = useData({ product })

  const { getFilteredOptions: getFilteredValues } = useFilterOptionValues({
    variants,
    selectedValues,
  })
  // * update variant when user select all options
  useEffect(() => {
    if (!!!types || !!!types.length) return

    if (selectedValues.length === types.length) {
      const isSelectedOption = (value: ProductOption) => {
        return selectedValues.some((v) => v.id === value.id)
      }
      const hasAllOptionSelected = (variant: ProductVariant) => {
        return variant.options.every(isSelectedOption)
      }

      const selectedVariant = variants?.find(hasAllOptionSelected)
      setVariant(selectedVariant ? selectedVariant : null)
      return
    }
    if (variant) setVariant(null)
  }, [product, types, selectedValues, variants, variant])

  const handleSelectProductChange = (
    option: SingleValue<Option>,
    meta: ActionMeta<Option>
  ) => {
    setProduct(option?.value)
    if (meta.action === 'clear' && selectedValues.length) {
      clearSelectedOptions()
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

      {types &&
        types.map(
          (type) =>
            type && (
              <Box
                key={type.name}
                borderColor={'gray.300'}
                borderWidth="1px"
                p={3}
                rounded={5}
                mt={5}
              >
                <FormControl>
                  <FormLabel>{type.name}</FormLabel>
                  <ProductOptionGroup
                    removeSelectedOptionType={removeOptionType.bind(null, type)}
                    type={type}
                    filteredOptions={getFilteredValues(type)}
                    updateSelectedOption={updateSelectedOption}
                  />
                </FormControl>
              </Box>
            )
        )}

      {/*Giỏ hàng  */}
      <Flex
        direction={'column'}
        mt={5}
        borderWidth={'1px'}
        borderColor="gray.300"
        p={5}
        rounded={5}
        maxH="500px"
      >
        <Heading
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          Giỏ hàng <Button mt={5}>Đặt hàng</Button>
        </Heading>
        <VStack
          align={'stretch'}
          spacing={4}
          overflow="hidden"
          overflowY="scroll"
          divider={<StackDivider borderColor={'gray.200'} />}
        >
          {cartItems.map((item) => {
            return (
              <Box key={item.variant.id}>
                <Flex>
                  <CartItem
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart.bind(
                      this,
                      item.variant.id
                    )}
                  />
                </Flex>
              </Box>
            )
          })}
        </VStack>
        <CartList />
      </Flex>
    </Box>
  )
}

const useData = ({ product }: { product: Product | null | undefined }) => {
  const cleanUrl = (url?: string) => (url ? url.replace(/\{.*?\}/g, '') : '')
  const { data: variantsData } = useSWR(
    cleanUrl(product?._links?.variants.href),
    fetcher
  )
  const { data: optionsData } = useSWR(
    cleanUrl(
      `${product?._links?.options.href}?projection=${config.api.products.options.projection.withType} `
    ),
    fetcher
  )

  const variants: ProductVariant[] | undefined = useMemo(
    () => variantsData?._embedded.productVariants,
    [variantsData]
  )

  const options: ProductOption[] = useMemo(
    () => optionsData?._embedded?.productOptions,
    [optionsData]
  )

  const types = useMemo(() => {
    if (!!!options) return
    let types: OptionType[] = []

    options?.forEach((option) => {
      if (!!!option.type) return

      const isTheSameTypeOfOption = (type: OptionType) =>
        option.type?.id === type.id
      const type = types.find(isTheSameTypeOfOption)
      if (type) {
        type.values?.push(option)
      } else {
        types.push({ ...option?.type, values: [option] })
      }
    })
    return types
  }, [options])
  return {
    variants,
    options,
    types,
  }
}

const useFilterOptionValues = ({
  variants,
  selectedValues,
}: {
  variants?: ProductVariant[]
  selectedValues?: ProductOption[]
}) => {
  // * filter variant option values
  const filteredVariantOptions: ProductOption[] = useMemo(() => {
    let filteredValues: ProductOption[] = []
    let filteredVariants: ProductVariant[] = []
    let excludedValues: ProductOption[] = []

    const isValueSelected = (item: ProductOption) => {
      return selectedValues?.some((value) => item.id === value.id)
    }
    //* when variants data available
    if (!!variants && !!variants.length) {
      //* only get variants which are enabled and have available quantity > 0
      const isValidVariant = (variant: ProductVariant) =>
        variant.enabled || variant.availableQuantity > 0
      filteredVariants = variants.filter(isValidVariant)

      //*
      if (selectedValues?.length) {
        excludedValues = variants
          .filter(
            (variant) =>
              //* if filter only invalidVariants, every options will get disabled even though it exists in other valid variants
              //* so we need to check if a option is selected first and it may lead to an invalid variant => exclude other property that may lead to invaild
              variant.options.some(isValueSelected) && !isValidVariant(variant)
          )
          .flatMap((variant) => variant.options)
          .filter((item) => !isValueSelected(item)) //* only excluded not selected values
      }
    }

    filteredValues = [
      ...filteredValues,
      ...(filteredVariants?.flatMap((v) => v.options) || []),
    ].filter(
      (value) => !excludedValues.some((exValue) => exValue.id === value.id)
    )
    return filteredValues
  }, [variants, selectedValues])

  //? filter for each type
  const getFilteredOptions = (type: OptionType): ProductOption[] => {
    let options: ProductOption[] = []
    if (type.values && variants) {
      const isInFilteredVariantOption = (option: ProductOption) =>
        filteredVariantOptions.some(
          (variantOption) => option.id === variantOption.id
        )
      // *filter to get value of this options that are available in variants
      options = type.values.filter(isInFilteredVariantOption)
    }
    return options
  }
  return {
    getFilteredOptions,
  }
}
export default CartForm

// select * from product_variant_option_value pvov join product_variant pv on pvov.variant_id = pv.id
// join product_option_value pov on pov.id = pvov.option_value_id
