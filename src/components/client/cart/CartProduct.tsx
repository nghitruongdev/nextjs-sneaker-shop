import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Select,
  Image,
  Text,
} from '@chakra-ui/react'
import { AiOutlineHeart } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'

const CartProduct = () => {
  return (
    <Box>
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
      <Divider />
    </Box>
  )
}
export default CartProduct;
