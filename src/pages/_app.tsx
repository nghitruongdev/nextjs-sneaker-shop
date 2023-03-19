import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import theme from '../theme'
import { store } from '../redux/store';
import { Provider } from 'react-redux';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
      <Head>
        <link
          rel="icon"
          href="/naruto.ico"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      </Provider>
    </ChakraProvider>
  )
}
