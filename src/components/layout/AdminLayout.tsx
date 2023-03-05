import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement, ReactNode } from 'react'
import Footer from '../admin/Footer'
import MySidebar from '../admin/MySidebar'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MySidebar>{children}</MySidebar>
      <Footer />
    </>
  )
}

export default AdminLayout
