import { Box } from '@chakra-ui/react'

const TransparentOverlay = () => {
  return (
    <Box
      pos="absolute"
      top="0"
      left="0"
      boxSize="full"
      zIndex="100"
    />
  )
}

export default TransparentOverlay
