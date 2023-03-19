import { Box, useColorModeValue } from '@chakra-ui/react'
import Header from './Header'
import { ComponentType, ReactElement, ReactNode } from 'react'

interface MainProps {
  children: ReactNode
  header: ReactElement
  footer: ReactElement
  isSidebarExpanded?: boolean
}
const Main = ({
  header,
  footer,
  isSidebarExpanded = true,
  children,
  ...props
}: MainProps) => {
  /* Main box including header + main content */

  return (
    <Box
      ml={{ base: 0, md: isSidebarExpanded ? 60 : 14 }}
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
