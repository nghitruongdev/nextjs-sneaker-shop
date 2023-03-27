import { Box, Flex, Image, Text, Grid, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react';
import RadioButton from './RadioButton';
import useSWR from 'swr';
import { ProductOption } from '@/domain/ProductOption';
import { ProductVariant } from '@/domain/ProductVariant';
import Product from '@/domain/Product';
import { getFetcher } from '@/hooks/useFetcher';
import ProductOptionGroup from '../admin/order/new-order/ProductOptionGroup';

// const fetcher = getFetcher();

//   const [product, setProduct] = useState<Product | null>(null)
//   const [variant, setVariant] = useState<ProductVariant | null>(null)
//   const [quantity, setQuantity] = useState<number>(1)

//   const useData = ({ product }: { product: Product | null | undefined }) => {
//     const { data: variantsData } = useSWR(product?._links?.variants.href, fetcher)
//     const { data: optionsData } = useSWR(product?._links?.options.href, fetcher)
  
//     const options: ProductOption[] | undefined = useMemo(() => {
//       return optionsData?._embedded.productOptions
//     }, [optionsData])
  
//     const variants: ProductVariant[] | undefined = useMemo(
//       () => variantsData?._embedded.productVariants,
//       [variantsData]
//     )
//     return {
//       variants,
//       options,
//     }
//   }
//   const { variants, options } = useData({ product })


// TODO: Adjust the 404 page and make variant && product like from admin
const Overview = (props: any) => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    async function fetchProductData() {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        const data: any = await response.json();
        setProduct(data);
    }
    fetchProductData();
  }, [productId])

  if (!product) {
    return <div>Not found...</div>;
  }

  return (
    <Box
      p={'100px'}
      fontFamily={'sans-serif'}
    >
      <Flex justifyContent="flex-start">
        <Flex
          display={{
            base: 'none',
            md: 'inline-flex',
          }}
          ml={'60px'}
          justifyContent="flex-start"
          flexDirection="column"
          alignItems="center"
        >
          <Image
            borderRadius={'5px'}
            boxSize={10}
            height="60px"
            width="60px"
            mr={'15px'}
            objectFit={'contain'}
            src="https://static.nike.com/a/images/t_PDP_1728_v1/ca113e5f-2165-476a-8dcf-ce7a0d85356c/air-jordan-1-mid-se-shoes-CQ6f9G.png"
          />
        </Flex>
        <Flex>
          <Image
            height="600px"
            width="600px"
            objectFit={'cover'}
            borderRadius={'8px'}
            src="https://static.nike.com/a/images/t_PDP_1728_v1/ca113e5f-2165-476a-8dcf-ce7a0d85356c/air-jordan-1-mid-se-shoes-CQ6f9G.png"
          />
        </Flex>
        <Flex
          flexDirection="column"
          ml={'5rem'}
        >
          <Box
            mb={'30px'}
            pr={'30px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'end'}
            fontFamily={'sans-serif'}
          >
            <Flex fontSize={'30px'}>
              <h1>{product?.name}</h1>
            </Flex>
            <Flex>
              <h1>Men's shoes</h1>
            </Flex>
          </Box>
          <Flex flexDirection="column">
            <Flex mb={'15px'}>
              <Text>{product?.minPrice} VNĐ</Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              mb={'30px'}
              borderRadius={'3px'}
            >
              <Image
                height="80px"
                width="80px"
                mr={4}
                borderRadius={'3px'}
                src="https://static.nike.com/a/images/t_PDP_1728_v1/ca113e5f-2165-476a-8dcf-ce7a0d85356c/air-jordan-1-mid-se-shoes-CQ6f9G.png"
              />
              <Image
                height="80px"
                width="80px"
                borderRadius={'3px'}
                src="https://static.nike.com/a/images/t_PDP_1728_v1/ca113e5f-2165-476a-8dcf-ce7a0d85356c/air-jordan-1-mid-se-shoes-CQ6f9G.png"
              />
            </Flex>
            <Flex flexDirection="column">
              <Flex
                mb={'10px'}
                fontFamily={'sans-serif'}
              >
                <Text>Select Size</Text>
              </Flex>
              <Flex>
                <Flex>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap={3}
                  >
                    {/* <Input
                      type={'radio'}
                      cursor={'pointer'}
                      width={20}
                      focusBorderColor={'black.400'}
                      variant="outline"
                      placeholder="EU 40"
                      _placeholder={{ opacity: 1, color: 'inherit' }}
                      display="block"
                      overflow="hidden"
                    /> */}
                    {/* {options &&
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
        ))} */}

                  </Grid>
                </Flex>
              </Flex>
              <Flex
                mt={'30px'}
                justifyContent={'center'}
                direction={'column'}
                gap={3}
                fontFamily={'sans-serif'}
                fontSize={'13px'}
              >
                <Button
                  w={'265px'}
                  h={'60px'}
                  colorScheme={'blackAlpha'}
                  bg={'black'}
                  borderRadius={'30px'}
                  fontWeight={500}
                  fontFamily={'sans-serif'}
                  fontSize={'16px'}
                >
                  Add to cart
                </Button>
                <Button
                  w={'265px'}
                  h={'60px'}
                  variant={'outline'}
                  borderRadius={'30px'}
                  fontWeight={500}
                  fontFamily={'sans-serif'}
                  fontSize={'16px'}
                >
                  Favorite ❤️
                </Button>
              </Flex>
              <Flex />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Overview
