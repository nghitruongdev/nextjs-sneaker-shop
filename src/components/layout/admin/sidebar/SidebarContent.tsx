import {
  Accordion,
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { RiFlashlightFill } from 'react-icons/ri'
import { SidebarItemProps as ItemProps, SidebarItemProps } from './SidebarItem'
import { AiOutlineBorderVerticle, AiOutlineHome } from 'react-icons/ai'
import { FiHome, FiCompass, FiStar, FiSettings } from 'react-icons/fi'
import SidebarList from './SidebarList'

const Items: Array<ItemProps> = [
  {
    name: 'Home',
    icon: FiHome,
    href: '/admin',
  },
  {
    name: 'Đơn hàng',
    icon: AiOutlineBorderVerticle,
    href: '/admin/orders',
    subItems: [
      {
        name: 'Tạo mới đơn hàng',
        icon: AiOutlineBorderVerticle,
        href: '/admin/orders/new',
      },
    ],
  },
  //* inline - collection, attributes, options, reviews
  { name: 'Users', icon: FiCompass, href: '/admin/users' },
  { name: 'Categories', icon: FiCompass, href: '/admin/categories' },
  { name: 'Brands', icon: FiCompass, href: '/admin/brands' },
  { name: 'Discounts', icon: FiCompass, href: '/admin/discounts' },
  { name: 'Products', icon: FiStar, href: '/admin/products' },
  { name: 'New Product', icon: FiStar, href: '/admin/products/new' },
  {
    name: 'Product Variants',
    icon: FiStar,
    href: '/admin/products/variants',
  },
  { name: 'Settings', icon: FiSettings, href: '/admin' },
]

const SidebarContent = ({
  isExpanded,
  ...props
}: { isExpanded?: boolean } & BoxProps) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      transition=".3 ease"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth="1px"
      w={{ base: 'full', sm: isExpanded ? 60 : '14' }}
      {...props}
    >
      {/* Brand */}
      <Flex
        px="4"
        py="5"
        align="center"
      >
        <Icon
          as={RiFlashlightFill}
          boxSize="8"
        />
        <Heading
          fontSize="2xl"
          ml="2"
          color={useColorModeValue('brand.default', 'white')}
        >
          VNCO
        </Heading>
      </Flex>

      {/* Main Items */}
      <SidebarList
        items={Items}
        isExpanded={isExpanded}
      />
    </Box>
  )
}
export default SidebarContent
