import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { FaBell } from 'react-icons/fa'
import { FiBell, FiMenu } from 'react-icons/fi'
import { RiBellFill } from 'react-icons/ri'

interface HeaderProps {
  onOpen: () => void
  onToggle: () => void
}
const Header = ({ onOpen, onToggle }: HeaderProps) => {
  return (
    <Flex
      as="header"
      align="center"
      justify={{ base: 'space-between', md: 'flex-end' }}
      w="full"
      px={4}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('inherit', 'gray.700')}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="sm"
      h="14"
      className=""
    >
      {/* Icon disclosure side bar */}
      <IconButton
        aria-label="Menu"
        onClick={onOpen}
        icon={<FiMenu />}
        size="sm"
        display={{ base: 'inline-flex', md: 'none' }}
      />

      {/* Button to hide the sidebar */}
      <IconButton
        aria-label="Menu"
        onClick={onToggle}
        icon={<FiMenu />}
        size="sm"
        display={{ base: 'none', md: 'inline-flex' }}
      />
      <Spacer display={{ base: 'hidden', md: 'flex' }} />
      {/* Right info: avatar user + bell */}
      <Flex align="center">
        <Icon
          as={FaBell}
          color="gray.500"
          cursor="pointer"
          aria-label="Notification"
        />

        <Avatar
          ml="4"
          name="Nghi Truong"
          size="sm"
          cursor="pointer"
          src=""
        />
      </Flex>
    </Flex>
  )
}
export default Header
