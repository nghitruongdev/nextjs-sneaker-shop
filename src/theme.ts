import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      default: '#4D96F3',
    },
  },
})

export default theme
