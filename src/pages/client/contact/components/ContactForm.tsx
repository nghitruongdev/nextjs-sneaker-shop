import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Icon, Input, Text, } from '@chakra-ui/react'
import { BsPhone } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
const Contact = () => {
    return (
        <>
        <Box p={20}>
          <Text ml={'12rem'} fontWeight={'bold'} fontFamily={'sans-serif'} marginBottom={'30px'}>Contact us</Text>
          <Flex
            alignItems="flex-start"
            justifyContent="space-around"
          >
  
            <Flex>
              <FormControl>
                <FormLabel fontSize={'14px'}>Your name</FormLabel>
                <Input fontSize={'14px'} overflow={'hidden'} pr={20} placeholder={'What should we call you ?'}/>
                <FormLabel fontSize={'14px'} mt={'10px'}>Your email</FormLabel>
                <Input fontSize={'14px'} overflow={'hidden'} pr={20} placeholder={'email@example.com'} />
                <FormHelperText >Input your email so that we can contact you</FormHelperText>
                <FormErrorMessage >Error message</FormErrorMessage>
                <FormLabel fontSize={'14px'} mt={'20px'}>What is your problem ?</FormLabel>
                <Input placeholder='I lost my cat' fontSize={'14px'}/>
              </FormControl>
            </Flex>
            <Flex direction={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Box
                display="flex"
                alignItems={'center'}
                flexDirection="row"
                justifyContent={'center'}
                mr={10}
                mb={10}
              >
                <Icon as={BsPhone} h={30} w={30} mr={'10px'}/>
                <Text>(+84) 373038920</Text>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                mr={10}
              >
                <Icon as={FiMail} h={30} w={30} mr={'10px'} />
                <Text>box@vnco.co</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </>
    );
}

export default Contact;