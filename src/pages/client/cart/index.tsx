import ClientLayout from '@/components/layout/ClientLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Select,
  Image,
  Text,
  Divider,
  GridItem,
  Stack,
} from '@chakra-ui/react'
import { ChevronDownIcon, CopyIcon } from '@chakra-ui/icons'
import { AiOutlineHeart } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
const CartPage: NextPageWithLayout = () => {
  return (
    <Box
      paddingBlock={'50px'}
      paddingInline={'250px'}
      fontFamily={'sans-serif'}
    >
      <Flex justifyContent="space-between">
        {/* product table */}
        <Box>
          {/* your cart text */}
          <Flex>
            <Text
              fontSize={'22px'}
              fontWeight={'400'}
              fontFamily={'sans-serif'}
            >
              Your cart
            </Text>
          </Flex>
          {/* cart product */}
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="space-between"
              paddingBlock={'15px'}
            >
              <Flex
                alignItems="flex-start"
                justifyContent={'space-between'}
              >
                {/* image  */}
                <Box
                  ml={'5px'}
                  mr={'20px'}
                  h={'150px'}
                >
                  <Image
                    height="full"
                    width="full"
                    objectFit={'cover'}
                    src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png"
                  />
                </Box>
                {/* name size quantity */}
                <Flex flexDirection="column">
                  <Flex
                    flexDirection="column"
                    ml={'13px'}
                  >
                    <Text
                      fontWeight={'500'}
                      fontSize={'16px'}
                    >
                      Nike pro
                    </Text>
                    <Text
                      paddingBlock={'5px'}
                      color={'gray.500'}
                    >
                      Variant
                    </Text>
                  </Flex>

                  {/* size quantity */}
                  <Flex ml={'13px'}>
                    <Box display={'flex'}>
                      <Text color={'gray.700'}>Size</Text>
                      <Select
                        ml={'5px'}
                        icon={<ChevronDownIcon />}
                        variant="unstyled"
                        size="xs"
                        fontSize={'13px'}
                        fontWeight={'500'}
                      >
                        <option value="S">S</option>
                        <option value="S">M</option>
                        <option value="S">L</option>
                        <option value="S">XL</option>
                        <option value="S">2XL</option>
                      </Select>
                    </Box>
                    <Flex>
                      <Text color={'gray.700'}>Quantity</Text>
                      <Select
                        ml={'10px'}
                        icon={<ChevronDownIcon />}
                        variant="unstyled"
                        size="xs"
                        fontSize={'13px'}
                        fontWeight={'500'}
                      >
                        <option value="S">1</option>
                        <option value="S">2</option>
                        <option value="S">3</option>
                        <option value="S">4</option>
                      </Select>
                    </Flex>
                  </Flex>

                  {/* buttons */}
                  <Flex
                    alignItems="space-between"
                    mr={'4'}
                  >
                    <IconButton
                      aria-label="icon"
                      icon={<AiOutlineHeart />}
                      size="md"
                      isRound
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="icon"
                      icon={<HiOutlineTrash />}
                      size="md"
                      isRound
                      variant="ghost"
                    />
                  </Flex>
                </Flex>
              </Flex>

              {/* price and remove + favorite buttons */}
              <Flex
                flexDirection="column"
                ml={'7.5rem'}
              >
                <Flex justifyContent={'flex-end'}>
                  <Text>2.300.000 VND</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Divider></Divider>
        </Box>

        {/* Summary table */}
        <Flex
          flexDirection="column"
          ml={'3px'}
        >
          <Text
            fontSize={'22px'}
            fontWeight={'460'}
            paddingBottom={'20px'}
          >
            Summary
          </Text>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={'10px'}
          >
            <GridItem>Subtotal</GridItem>
            <GridItem>2.300.000VND</GridItem>
            <GridItem>Subtotal</GridItem>
            <GridItem>2.300.000VND</GridItem>
          </Grid>

          {/* total and checkout button */}
          <Divider mt={5}/>
          <Flex>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={'10px'}
            mt={5}
          >
            <GridItem>Total</GridItem>
            <GridItem>2.300.000VND</GridItem>
          </Grid>
          </Flex>
          
          <Divider mt={5}/>
          <Button
            variant="solid"
            size="lg"
            mt={5}
            fontSize={'14px'}
            fontWeight={'400'}
            bg={'black'}
            colorScheme={'blackAlpha'}
            borderRadius={'2xl'}
          >

            Checkout
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
CartPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default CartPage
