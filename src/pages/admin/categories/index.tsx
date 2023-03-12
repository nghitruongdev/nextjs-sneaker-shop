import CategoryTable from '@/components/admin/category/CategoryTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import useSWR, { preload } from 'swr'
import { getFetcher } from '@/hooks/useFetcher'
import config from 'config'
import { useEffect, useState } from 'react'

export type Page = {
  size: number
  totalElements: number
  totalPages: number
  number: number
}
const fetcher = getFetcher()

const CategoryPage: NextPageWithLayout = () => {
  console.debug('Category page rerendered')
  const [page, setPage] = useState<Page>()
  const [size, setSize] = useState<number>(5)

  const keyUrl = `${config.api.categories}?sort=id,desc&page=${page?.number}&size=${size}`

  preload(keyUrl, fetcher)
  const { isLoading, error, mutate, data } = useSWR(keyUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnReconnect: true,
  })

  useEffect(() => {
    setPage(data?.page)
  }, [data])

  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error.message)}</>

  const items = data._embedded.categories
  const changePage = () => {}
  return (
    <>
      <CategoryTable
        items={items}
        page={page}
        setSize={setSize}
      />
    </>
  )
}

CategoryPage.getLayout = getAdminLayout
export default CategoryPage
