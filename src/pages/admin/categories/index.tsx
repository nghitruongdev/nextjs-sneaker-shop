import CategoryTable from '@/components/admin/category/CategoryTable'
import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import config from 'config'
import { useState } from 'react'

const CategoryPage: NextPageWithLayout = () => {
  const [size, setSize] = useState<number>(5)
  const [pageIndex, setPageIndex] = useState(0)

  console.debug('Category page rerendered')

  const keyUrl = `${config.api.products.categories.url}?sort=id,desc&page=${pageIndex}&size=${size}`

  const changePageHandler = (total: number, index: number) => {
    if (index) return
    if (pageIndex === index) return
    if (index >= total) return
    if (index < 0) return
    setPageIndex(index)
  }

  return (
    <>
      <CategoryTable
        indexPage={pageIndex}
        setSize={setSize}
        onChangePage={changePageHandler}
        keyUrl={keyUrl}
      />
    </>
  )
}

CategoryPage.getLayout = getAdminLayout
export default CategoryPage
