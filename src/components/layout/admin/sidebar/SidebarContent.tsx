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
import { AiOutlineBorderVerticle, AiOutlineHome } from 'react-icons/ai'
import { FiHome, FiCompass, FiStar, FiSettings } from 'react-icons/fi'
import SidebarList from './SidebarList'
import Items from './Items'

const items = Items
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
        items={items}
        isExpanded={isExpanded}
      />
    </Box>
  )
}
export default SidebarContent
