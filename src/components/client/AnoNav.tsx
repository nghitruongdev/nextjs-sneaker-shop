import {
  ChakraProvider,
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  Image,
  Grid,
  Text,
  Link,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
} from '@chakra-ui/react'
import { BsMinecart } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { OutliningSpanKind } from 'typescript'
import NextLink from 'next/link'
import logo from '../../assets/images/logo.png'

export default function AnoNav() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      p={0}
      m={0}
      boxShadow="base"
    >
      <Flex
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        backgroundColor="#eeeeee"
      >
        <Text
          pl={10}
          fontWeight="bold"
        >
          VNCO
        </Text>
        <Flex
          alignItems="stretch"
          flexDirection="row"
          justifyContent="space-between"
          p={0}
        >
          <Link
            href={'/client/contact'}
            pr={3}
            fontSize={13}
          >
            FAQ
          </Link>
          <Link
            href={'/client/contact'}
            pr={3}
            fontSize={13}
          >
            Contacts
          </Link>
          <Link
            href={'/auth/login'}
            pr={3}
            fontSize={13}
          >
            Sign in
          </Link>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        flexDirection="row"
        display="flex"
        alignItems="center"
        m={0}
        mr={5}
        ml={5}
        p={0}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          ml={3}
          p={3}
        >
          <NextLink href="/client">
            <Image
              height={'45px'}
              width={'45px'}
              fallbackSrc="/logo.png"
              cursor={'pointer'}
              // bg={'white'}
              // color={'white'}
              // _hover={''}
              _hover={'blackAlpha'}
            />
          </NextLink>
        </Flex>
        <Tabs variant={'none'}>
          <TabList
            opacity={1}
            display="flex"
            alignItems="center"
            m={0}
            p={0}
          >
            {/* This is navbar and subnav */}
            <Flex
              flex={{ base: -1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon
                      w={3}
                      h={3}
                    />
                  ) : (
                    <HamburgerIcon
                      w={5}
                      h={5}
                    />
                  )
                }
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>
            <Flex
              flex={{ base: 1 }}
              justify={{ base: 'center', md: 'start' }}
            >
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}
              ></Text>

              <Flex
                display={{ base: 'none', md: 'flex' }}
                ml={10}
              >
                <DesktopNav />
              </Flex>
            </Flex>
            {/* delete above this line */}
          </TabList>
        </Tabs>
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={3}
          display="flex"
          mr={3}
        >
          <NextLink href="/client/cart">
            <Box pos="absolute">
              <IconButton
                right={10}
                aria-label="icon"
                icon={<BsMinecart />}
                // boxSize="xs"
                size="lg"
                borderRadius={30}
                // opacity={1}
                overflow="visible"
                display="flex"
                isRound
                variant="ghost"
              />
              <Text
                fontSize={'9px'}
                fontWeight={'500'}
                pos={'relative'}
                bottom={'31px'}
                right={'18.3px'}
              >
                7
              </Text>
            </Box>
          </NextLink>
          <NextLink href="/client/favorites">
            <IconButton
              aria-label="icon"
              icon={<AiOutlineHeart />}
              size="lg"
              borderRadius={30}
              variant="ghost"
            />
          </NextLink>
        </Grid>
      </Flex>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.700', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.500', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.500')

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover
            trigger={'hover'}
            placement={'bottom-start'}
          >
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      {...child}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('gray.50', 'gray.500') }}
    >
      <Stack
        direction={'row'}
        align={'center'}
      >
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'gray.500' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon
            color={'gray.400'}
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
      </Stack>
    </Link>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Male',
    href: '/client/products',
    children: [
      {
        label: 'Sneakers',
        subLabel: 'Not only an running shoes',
        href: '/client/contact',
      },
      {
        label: 'Sports',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Female',
    href: '/client/products',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '/job',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Collections',
    href: '/client/products',
  },
  {
    label: 'About Us',
    href: '/client/about',
  },
]
