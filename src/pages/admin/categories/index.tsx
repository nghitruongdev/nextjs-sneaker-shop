import CategoryTable from '@/components/admin/category/CategoryTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import { Button } from '@chakra-ui/react'

const index: NextPageWithLayout = () => {
  const headers = ['id', 'name', 'parent category', 'description']
  const data = {
    id: 1,
    name: 'Category',
    parent: 'mama',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quis blanditiis illum quidem facere sequi quae voluptatum reiciendis ipsam non! Maxime, tempora repudiandae? Tenetur cumque, consequuntur ullam nesciunt repudiandae id.',
  }
  return (
    <>
      <Button
        bg={'red'}
        colorScheme={'blue'}
      >
        Add New Category
      </Button>
      <CategoryTable
        headers={headers}
        data={data}
      />
    </>
  )
}

index.getLayout = getAdminLayout
export default index
