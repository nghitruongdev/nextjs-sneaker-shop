'use client'
import { NextPageWithLayout } from '../_app'
import { getAdminLayout } from '../../components/layout/admin/AdminLayout'

const AdminPage: NextPageWithLayout = () => {
  return (
    <>
      <div>This is a admin page</div>
    </>
  )
}

AdminPage.getLayout = getAdminLayout

export default AdminPage
