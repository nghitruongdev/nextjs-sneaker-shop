import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link';
export default function WithBackgroundImage() {
  return (
    <Box>
      <Flex direction={'column'}>
        <Flex
        //   pb={'20px'}
        p={2}
          backgroundColor={'#eeeeee'}
        justifyContent={'center'}
            alignItems={'center'}
            alignContent={'center'}
       >
          <Flex
        //   backgroundColor={'#eeeeee'}
          direction={'column'}
           justifyContent={'center'}
           alignItems={'center'}
           alignContent={'center'}
           fontFamily={'sans-serif'}
           >
            <Text fontSize={'14px'}>
                Free delivery service
            </Text>
            <Text fontSize={'12px'}>
                <p>
                    Sale up to 40%
                    <NextLink href={'/client/#'}>
                        View Detail
                    </NextLink>
                </p>
            </Text>
        </Flex>
        </Flex>
        <Flex
          w={'full'}
          h={'80vh'}
          backgroundImage={'./images/banner.jpg'}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
        >
          {/* <Image src={'/images/banner.jpg'} alt={'banner'} object-fit={'fit'} width={1000} height={800}/> */}
          <VStack
            w={'full'}
            justify={'center'}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
          >
            <Stack
              maxW={'2xl'}
              align={'flex-start'}
              spacing={6}
            >
              <Text
                color={'white'}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
              >
                Confident, Flexible, Youth, Brave
              </Text>
              <Stack direction={'row'}>
                <Button
                  bg={'white'}
                  rounded={'full'}
                  color={'black'}
                  _hover={{ bg: 'gray.300' }}
                >
                  Show me more
                </Button>
                {/* <Button
                  bg={'whiteAlpha.300'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'whiteAlpha.500' }}
                >
                  Show me more
                </Button> */}
              </Stack>
            </Stack>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  )
}
