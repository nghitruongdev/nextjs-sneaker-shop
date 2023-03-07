import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const index: NextPageWithLayout = () => {
  return <div>User index page</div>
}
index.getLayout = getAdminLayout
export default index
