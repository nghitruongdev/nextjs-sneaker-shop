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
} from '@chakra-ui/react'
import { ChevronDownIcon, CopyIcon } from '@chakra-ui/icons'
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
              paddingBlock={'16px'}
            >
              <Flex
                alignItems="flex-start"
                justifyContent={'space-between'}
              >
                {/* image  */}
                <Box
                  ml={'10px'}
                  mr={'30px'}
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
                  <Flex flexDirection="column">
                    <Text
                      fontWeight={'500'}
                      fontSize={'16px'}
                    >
                      Nike pro
                    </Text>
                    <Text
                      paddingBlock={'10px'}
                      color={'gray.500'}
                    >
                      Variant
                    </Text>
                  </Flex>
                  <Flex>
                    <Box display={'flex'}>
                      <Text color={'gray.700'}>Size</Text>
                      <Select
                        ml={'10px'}
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
                </Flex>
              </Flex>

              {/* price and remove + favorite buttons */}
              <Flex
                flexDirection="column"
                ml={'15rem'}
              >
                <Flex>
                  <Text>2.300.000 VND</Text>
                </Flex>
                <Flex alignItems="space-between">
                  <IconButton
                    aria-label="icon"
                    icon={<CopyIcon />}
                    size="md"
                    isRound
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="icon"
                    icon={<CopyIcon />}
                    size="md"
                    isRound
                    variant="ghost"
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
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
          <Flex
            justifyContent="space-between"
            flexDirection="column"
            pr={10}
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={3}
              display="grid"
            >
              <Text>Subtotal</Text>
              <Text>Text value</Text>
            </Grid>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={3}
            >
              <Text>Shipping</Text>
              <Text>Text value</Text>
            </Grid>
          </Flex>
          <Button
            variant="solid"
            size="md"
            mt={5}
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
