import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Spacer,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FaBell } from 'react-icons/fa'
import SidebarList from './SidebarList'

export interface SidebarItemProps extends AccordionItemProps {
  name: string
  icon?: IconType
  href: string
  subItems?: Array<SidebarItemProps>
  active?: boolean
  clickHandler?: () => void
}

const SidebarItem = ({
  icon,
  name,
  href,
  active,
  subItems,
  clickHandler,
  ...rest
}: SidebarItemProps) => {
  const bgColor =
    subItems && active ? 'gray.50' : active ? 'blue.50' : 'inherit'
  const color = subItems ? 'blue.500' : active ? 'blue.500' : ' inherit'
  const hover = {
    bg: useColorModeValue('gray.50', 'gray.900'),
    color: useColorModeValue('blue.500', 'gray.200'),
  }

  return (
    <AccordionItem
      border={'hidden'}
      bg={bgColor}
      color="gray.500"
      {...rest}
    >
      <Link
        href={href}
        as={NextLink}
        onClick={clickHandler}
        _hover={{
          textDecor: 'none',
        }}
      >
        <AccordionButton
          w="full"
          px="2"
          py="4"
          display="flex"
          alignItems="center"
          color={color}
          // bg={bgColor}
          role="group"
          fontWeight={subItems ? 'bold' : 'semibold'}
          fontSize="sm"
          transition=".15 ease"
          rounded="md"
          _hover={hover}
        >
          {icon && (
            <Icon
              as={icon}
              mx="2"
              mr="4"
              boxSize="5"
              fontWeight="semibold"
              _groupHover={{
                color: hover.color,
              }}
            />
          )}
          <Text>{name}</Text>

          {/* If has sub items */}
          {subItems && (
            <>
              <Spacer />
              <AccordionIcon />
            </>
          )}
        </AccordionButton>
      </Link>

      {/* If has subitems */}
      {subItems && (
        <AccordionPanel>
          <SidebarList
            items={subItems}
            isParentActive={active}
          />
        </AccordionPanel>
      )}
    </AccordionItem>
  )
}
export default SidebarItem
