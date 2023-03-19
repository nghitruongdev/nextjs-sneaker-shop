import { Button, Box, Divider } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { ButtonProps } from '@chakra-ui/button'
import { RiPencilLine, RiFileShredLine } from 'react-icons/ri'

type Props = ButtonProps & { text?: string; hasDivider?: boolean }

const MenuButtonItem = ({
  text,
  hasDivider = true,
  children,
  ...props
}: Props) => {
  return (
    <Box>
      <Button
        w="150px"
        variant="ghost"
        justifyContent="space-between"
        fontWeight="normal"
        fontSize="sm"
        {...props}
      >
        {text || children}
      </Button>
      {hasDivider && <Divider />}
    </Box>
  )
}

export const EditButtonItem = ({ text, hasDivider, ...props }: Props) => {
  return (
    <MenuButtonItem
      rightIcon={<RiPencilLine />}
      colorScheme="green"
      text={'Edit'}
      {...props}
      hasDivider
    />
  )
}

export const DeleteButtonItem = ({ text, hasDivider, ...props }: Props) => {
  return (
    <MenuButtonItem
      rightIcon={<RiFileShredLine />}
      colorScheme="red"
      text={'Delete'}
      {...props}
      hasDivider
    />
  )
}

export default MenuButtonItem
