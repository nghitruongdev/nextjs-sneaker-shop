import { Box, useColorModeValue } from '@chakra-ui/react'
import Header from './Header'
import { ComponentType, ReactElement, ReactNode } from 'react'

interface MainProps {
  children: ReactNode
  header: ReactElement
  footer: ReactElement
}
const Main = ({ header, footer, children, ...props }: MainProps) => {
  /* Main box including header + main content */

  return (
    <Box
      ml={{ base: 0, md: 60 }}
      transition=".3s ease"
    >
      {header}

      <Box
        as="main"
        minH="25rem"
        p={8}
        bg={useColorModeValue('auto', 'gray.800')}
      >
        {children}
      </Box>
    </Box>
  )
}
export default Main
