import Product from '@/domain/Product'
import { ProductVariant } from '@/domain/ProductVariant'
import product from '@/pages/client/product'
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { BsTrashFill } from 'react-icons/all'
export type CartItemType = {
  variant: ProductVariant
  product: Product
  quantity: number
}

type Props = {
  item: CartItemType
  handleRemoveFromCart: () => void
}

const CartItem = ({
  item: { variant, product, quantity },
  handleRemoveFromCart,
}: Props) => {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.minPrice * quantity)
  return (
    <Box
      mt={'13px'}
      key={variant.id}
      w="full"
      display={'flex'}
      flex-direction="column"
    >
      <Image
        src={
          'https://th.bing.com/th/id/R.068f260a731740d4ec3dde503540aa8b?rik=vDkKHxDoxrTtjQ&riu=http%3a%2f%2fwww.resentin.it%2fimages%2fi%2fnike+jordan-609mbs.jpg&ehk=ToA3Owm9DfW%2bPxLJKMfmaU0R5jcM5cBZZD0j%2frUTAaE%3d&risl=&pid=ImgRaw&r=0'
        }
        w={'100px'}
        h={'100px'}
        objectFit={'cover'}
      />
      <Flex
        direction={'column'}
        fontFamily={'sans-serif'}
        ml={'20px'}
        mr={'120px'}
      >
        <Text
          fontSize={'18px'}
          fontFamily={'sans-serif'}
        >
          {product.name}
        </Text>
        {/* <Flex direction={'row'}> */}
        <Text
          mt={'16px'}
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Price: {usDollar}
        </Text>
        <Text
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Quantity: {quantity}
        </Text>
        {/* </Flex> */}
      </Flex>
      <Flex>
        <IconButton
          mt={7}
          variant={'ghost'}
          colorScheme={'blackAlpha'}
          onClick={handleRemoveFromCart}
          icon={
            <BsTrashFill
              color="red"
              size={'15px'}
            />
          }
          aria-label={'Delete'}
        />
      </Flex>
    </Box>
  )
}
export default CartItem
