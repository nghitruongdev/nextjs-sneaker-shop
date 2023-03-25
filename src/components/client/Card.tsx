import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
  Icon,
} from '@chakra-ui/react'
import { connect, useDispatch } from 'react-redux'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr'
import { addToCart } from '../../redux/Cart/cart-actions'
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { ADD_TO_CART } from '@/redux/Cart/cart-types'
import NextLink from 'next/link'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// export type CardType = {
//   id: string
//   name: string
//   minPrice: number
//   images: string[]
//   categories: string[]
// }

// type Props = {
//   item: CardType
//   // addToCart: (id: string) => void
// }

const Card = ({ item }: any) => {
  const [isFavourite, setIsFavorite] = useState(false)
  const dispatch = useDispatch()

  return (
      <Box
        w="lg"
        rounded={'sm'}
        my={3}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"

        // pos={'relative'}
      >
        <Box h={'300px'}>
          {/* <Icon
            boxSize={25}
            // ternary operator
            color={isFavourite ? 'red' : undefined}
            pos={'relative'}
            top={'43px'}
            left={'280px'}
            as={isFavourite ? BsHeartFill : BsHeart}
            onClick={() => setIsFavorite(!isFavourite)}
          /> */}
          <Img
            src={
              'https://th.bing.com/th/id/OIP.iBytPPicRuYBb6bWewISPAHaHa?pid=ImgDet&rs=1'
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Flex
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Flex
            fontFamily={'sans-serif'}
            justifyContent="flex-start"
            flexDirection="column"
            mt={10}
            ml={3}
          >
            <Text>{item.name}</Text>
            <Text color={'gray.500'}>{item.id}</Text>
            <Flex
              m={0}
              p={0}
            >
              <Button
                variant="ghost"
                size="sm"
                p={0}
                // onClick={() => addToCart(item.id)}
              >
                ${item.minPrice}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
  )
}
export default Card
