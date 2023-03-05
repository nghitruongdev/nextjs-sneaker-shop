import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import Sidebar2 from '@/components/admin/Sidebar2'
import Sidebar from '@/components/admin/SideBar1'
import MySidebar from '@/components/admin/MySidebar'

const AdminPage: NextPageWithLayout = () => {
  return <></>
}

AdminPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminPage
