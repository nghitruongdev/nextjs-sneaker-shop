import { Box, Heading, Input, Stack } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'

const OptionItem = () => {
  return (
    <Box>
      {/* <HStack align={'center'} textAlign={'center'}> */}
      <Heading
        size="sm"
        textTransform="uppercase"
        mb={'5px'}
      >
        size
      </Heading>

      <VStack
        border="1px"
        borderColor={'gray.300'}
        px={4}
      >
        <Input
          focusBorderColor="transparent"
          size="sm"
          placeholder="New size"
          border="none"
        />
        <Stack
          w={'full'}
          pb={5}
          flexWrap={'wrap'}
          spacing={'1'}
          gap={3}
          direction="row"
        >
          {/* <OptionValueItem name="EU-40" />
          <OptionValueItem name="EU-40" />
          <OptionValueItem name="EU-40" />
          <OptionValueItem name="EU-40" />
          <OptionValueItem name="EU-40" />
          <OptionValueItem name="EU-40" /> */}
        </Stack>
      </VStack>
      {/* <Button>Add new</Button> */}
      {/* </HStack> */}
      {/* <div className="flex space-x-2"></div> */}
    </Box>
  )
}
export default OptionItem
