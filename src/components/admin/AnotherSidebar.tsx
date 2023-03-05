import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
  BoxProps,
  Flex,
  Icon,
  Text,
  IconButton,
  Avatar,
  Stack,
  Heading,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import { RiFlashlightFill } from 'react-icons/ri'
import { AiOutlineHome, AiOutlineTeam } from 'react-icons/ai'
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa'

export default function AnotherSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="section"
      minH="100vh"
      bg={useColorModeValue('gray.50', 'red.100')}
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight={'none'}
          />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{ base: 0, md: 60 }}
        transition={'.3s ease'}
      >
        <Flex
          as="header"
          align="center"
          justify={{ base: 'space-between', md: 'flex-end' }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
          />

          <Flex align="center">
            <Icon
              color="gray.500"
              as={FaBell}
              cursor={'pointer'}
            />
            <Avatar
              ml="4"
              size="sm"
              name="admin@localhost"
              cursor={'pointer'}
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
            />
          </Flex>
        </Flex>

        <Box
          as="main"
          p="14"
          minH="25rem"
          bg={useColorModeValue('auto', 'gray.800')}
        >
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent={'center'}
            h="100%"
          >
            <Stack spacing={8}>
              <Box>
                <Heading
                  color={'blue.400'}
                  fontSize={'3xl'}
                >
                  Point of sale
                </Heading>
                <Text
                  color={'gray.500'}
                  fontSize={'md'}
                  p={4}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid nemo molestias, numquam, deleniti quae iure saepe,
                  quaerat amet sed quasi exercitationem provident minus
                  similique! Perferendis dolorum molestias cumque nostrum eos.
                </Text>
              </Box>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={'center'}
              >
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Order now
                </Button>
                <Button rounded="full">Vendors</Button>
                <Image
                  alt="Homepage Image"
                  objectFit="cover"
                  width="60vh"
                  src="http://pos-new-system.herokuapp.com/static/media/EmptyNotesList.2ec57340.svg"
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

const SidebarContent = ({ ...props }: BoxProps) => {
  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex={'sticky'}
        h="full"
        pb={10}
        overflowX="hidden"
        overflowY={'auto'}
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth={1}
        w="60"
        {...props}
      >
        <Flex
          px={5}
          py={5}
          align="center"
        >
          <Icon
            as={RiFlashlightFill}
            h={10}
            w={10}
          />
          <Text
            fontSize={'2xl'}
            ml="2"
            fontWeight="semibold"
            color={useColorModeValue('brand.500', 'white')}
          >
            VNCO
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize={'md'}
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
          <NavItem icon={AiOutlineTeam}>Team</NavItem>
          <NavItem icon={BsFolder2}>Projects</NavItem>
          <NavItem icon={BsCalendarCheck}>Calendar</NavItem>
        </Flex>
      </Box>
    </>
  )
}

const NavItem = (props: any) => {
  const color = useColorModeValue('gray.600', 'gray.300')
  const { icon, children } = props
  return (
    <Flex
      align={'center'}
      px="4"
      py="3"
      cursor={'pointer'}
      fontWeight="semibold"
      transition=".15s ease"
      // color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200'),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{ color: color }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  )
}
