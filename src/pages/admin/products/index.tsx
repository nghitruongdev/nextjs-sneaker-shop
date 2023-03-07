import AdminLayout from '@/components/layout/admin/AdminLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'

const ProductIndex: NextPageWithLayout = () => {
  return (
    <>
      {/* you will have a table */}
      <p>This will be a product table display product information</p>

      {/* Update row, Delete Row */}
    </>
  )
}

ProductIndex.getLayout = getAdminLayout
export default ProductIndex
