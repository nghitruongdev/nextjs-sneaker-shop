import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
const Summary = () => {
  return (
    <>
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
        <Divider mt={5} />
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

        <Divider mt={5} />
        <Box w={'full'}>
          <NextLink href="/client/checkout">
            <Button
              variant="solid"
              w={'full'}
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
          </NextLink>
        </Box>
      </Flex>
    </>
  )
}

export default Summary
