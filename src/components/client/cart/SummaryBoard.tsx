import { Button, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

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
    </>
  )
}

export default Summary;