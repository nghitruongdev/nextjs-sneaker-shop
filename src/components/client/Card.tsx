import { useState } from 'react'
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

import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr'
export default function Card() {
  const [isFavourite, setIsFavorite] = useState(false)

  return (
    <Center py={5}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        // pos={'relative'}
      >
        <Box h={'300px'}
        //  pos={'absolute'}
         >
          <Icon 
          boxSize={25} 
          // ternary operator
          color={isFavourite ? "red" : undefined}
          pos={'relative'} 
          top={'39px'} 
          left={'279px'}  
          as={isFavourite ? BsHeartFill : BsHeart} 
          onClick={() => setIsFavorite(!isFavourite)}
          />
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
        <Flex justifyContent="flex-start" flexDirection="column">
          <Flex
            fontFamily={'sans-serif'}
            justifyContent="flex-start"
            flexDirection="column"
            mt={3}
            ml={3}
          >
            <Text>Nike Pro 19</Text>
            <Text color={'gray.500'}>Male shoes</Text>
            <Flex m={0} p={0}>
              <Button variant="ghost" size="sm" mt={1} p={0}>
                Add to cart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Center>
  )
}
