import { Box } from '@chakra-ui/react'
import CartItem from './CartItem'
const CartList = () => {
  return (
    <>
      {[...Array(0).keys()].map((item) => (
        <Box key={item}>Hello wrold</Box>
      ))}
    </>
  )
}
export default CartList
