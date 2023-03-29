import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsCreditCard } from 'react-icons/bs'
const Checkout = () => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: any) => {
    setInput(e.target.value)
  }

  const isError = input === ''

  return (
    <Box>
      <Box>
        <Icon
          as={BsCreditCard}
          ml={'700px'}
          w={'60px'}
          h={'60px'}
        />
        <Text
          align={'center'}
          fontSize={30}
        >
          CHECKOUT
        </Text>
      </Box>
      <SimpleGrid
        columns={2}
        p={10}
        spacing={10}
      >
        <VStack align={'start'}>
          <FormControl isInvalid={isError}>
            <FormLabel fontSize={'14px'}>Name</FormLabel>
            <Input
              type={'text'}
              fontSize={'13px'}
              placeholder={'Hao Nguyen Xuan'}
            />{' '}
            {!isError ? (
              <FormHelperText>
                Let we know your name so we could delivery the item to you.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
            <FormLabel fontSize={'14px'}>Email</FormLabel>
            <Input
              fontSize={'13px'}
              type="email"
              placeholder="example@example.com"
              value={input}
              onChange={handleInputChange}
            />
            {!isError ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            <FormLabel fontSize={'14px'}>Phone</FormLabel>
            <Input
              fontSize={'13px'}
              type="number"
              placeholder={'(+84) 09x xxx xxx'}
            />
            {!isError ? (
              <FormHelperText>
                Enter the phone you'd like to receive the shoes from the
                delivery person.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Phone is required.</FormErrorMessage>
            )}
            <FormLabel fontSize={'14px'}>Address</FormLabel>
            <Input
              fontSize={'13px'}
              type="address"
              placeholder="QTSC Quan 12"
            />
            {!isError ? (
              <FormHelperText>
                Enter the address you'd like to receive the shoes from the
                delivery person.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Address is required.</FormErrorMessage>
            )}
          </FormControl>
          <Flex direction={'column'} justify={'flex-start'}>
            <FormControl>
              <FormLabel>Select payment methods</FormLabel>
              <RadioGroup defaultValue="ship">
                <VStack align={'start'} spacing="24px">
                  <Radio value="ship">Thanh toan khi nhan hang</Radio>
                  <Radio value="momo">Momo</Radio>
                  <Radio value="credit">Ngan hang noi dia</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
          </Flex>
        </VStack>
      </SimpleGrid>
    </Box>
  )
}

export default Checkout
