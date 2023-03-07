import { NextPageWithLayout } from '@/pages/_app'
import { Box, useDisclosure } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineBorderVerticle } from 'react-icons/ai'
import { FiHome, FiCompass, FiStar, FiSettings } from 'react-icons/fi'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Sidebar from './sidebar/Sidebar'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const header = <Header onOpen={onOpen} />
  const footer = <Footer />
  return (
    <>
      <Box
        as="section"
        minH="100vh"
        bg="gray.50"
        _dark={{
          bg: 'gray.700',
        }}
      >
        <Sidebar
          isOpen={isOpen}
          onClose={onClose}
        />

        <Main
          header={header}
          footer={footer}
        >
          {children}
        </Main>
      </Box>
    </>
  )
}

export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminLayout
