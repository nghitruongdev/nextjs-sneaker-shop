import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Box,
  Flex,
  ButtonProps,
  Divider,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs'
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri'
import { MouseEventHandler, ReactElement, ReactNode } from 'react'

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    /**
     * You may move the Popover outside Flex.
     */
    <Flex
      justify="center"
      align="center"
    >
      <Popover
        placement="bottom"
        isLazy
      >
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent
          w="fit-content"
          _focus={{ boxShadow: 'none' }}
        >
          <PopoverArrow />
          <PopoverBody>
            <Stack>{children}</Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

export default Menu
