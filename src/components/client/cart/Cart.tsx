import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Select,
  Text,
  Image,
} from '@chakra-ui/react'
import CartProduct from './CartProduct';
import Summary from './SummaryBoard';

const Cart = () => {
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
          <CartProduct />

        </Box>
        
        {/* Summary table */}
        <Summary />
      </Flex>
    </Box>
  )
}

export default Cart;
