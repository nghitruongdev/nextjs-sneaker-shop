import CategoryTable from '@/components/admin/category/CategoryTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import { Button } from '@chakra-ui/react'
import useSWR from 'swr'
import useFetcher from '@/hooks/useFetcher'
import config from 'config'

const CategoryPage: NextPageWithLayout = () => {
  const
  const transformArray = (data: any) =>
    data?._embedded?.categories.map((item: any) => item)

  const { isLoading, error, data } = useFetcher(config.api.categories, {
    transform: transformArray,
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error)}</>

  return (
    <>
      <Button
        bg={'red'}
        colorScheme={'blue'}
      >
        Add New Category
      </Button>
      <CategoryTable items={data} />
    </>
  )
}

CategoryPage.getLayout = getAdminLayout
export default CategoryPage
