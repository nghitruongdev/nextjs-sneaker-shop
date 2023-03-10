import CategoryTable from '@/components/admin/category/CategoryTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import { Button } from '@chakra-ui/react'
import useSWR from 'swr'
import useFetcher from '@/hooks/useFetcher'
import config from 'config'
import { useState } from 'react'
import Category from '@/domain/Category'

const transformArray = (data: any) =>
  data?._embedded?.categories.map((item: any) => item)

const CategoryPage: NextPageWithLayout = () => {
  const {
    isLoading,
    error,
    data: items,
  } = useFetcher(config.api.categories, {
    transform: transformArray,
  })
  // const [items, setItems] = useState(data)
  const [isAdding, setIsAdding] = useState(false)
  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error)}</>

  const cancelAddingHandler = () => {
    setIsAdding(false)
  }
  return (
    <>
      <Button
        colorScheme={'blue'}
        onClick={() => setIsAdding(true)}
      >
        Add New Category
      </Button>
      <CategoryTable
        items={items}
        isAdding={isAdding}
        cancelAddingHandler={cancelAddingHandler}
      />
    </>
  )
}

CategoryPage.getLayout = getAdminLayout
export default CategoryPage
