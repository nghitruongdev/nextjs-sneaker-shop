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
import { MouseEventHandler, ReactElement } from 'react'

export type MenuButtonAction = {
  name: string
  onClick?: MouseEventHandler
  icon?: ReactElement<IconType>
  colorScheme?: string
}
const MenuButton = ({
  actions,
  buttonProps = {},
}: {
  buttonProps?: ButtonProps
  actions?: MenuButtonAction[]
}) => {
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
            <Stack>
              {actions?.map(({ name, icon, colorScheme, onClick }, idx) => (
                <Box key={idx}>
                  <Button
                    w="150px"
                    variant="ghost"
                    rightIcon={icon}
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    colorScheme={colorScheme}
                    onClick={onClick}
                    {...buttonProps}
                  >
                    {name}
                  </Button>
                  <Divider />
                </Box>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

export default MenuButton
