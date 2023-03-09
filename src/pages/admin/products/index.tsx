import AdminLayout from '@/components/layout/admin/AdminLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import useSWR from 'swr'
import ProductTable from '../../../components/admin/product/ProductTable'
import useFetcher from '@/hooks/useFetcher'
import config from 'config'

const ProductPage: NextPageWithLayout = () => {
  const transformArray = (data: any) =>
    data?._embedded?.products.map((item: any) => item)

  const { data, isLoading, error } = useFetcher(config.api.products, {
    transform: transformArray,
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error)}</>

  return (
    <>
      {/* //todo: you will have a table */}
      <ProductTable items={data} />

      {/* //todo: Update row, Delete Row */}
    </>
  )
}

ProductPage.getLayout = getAdminLayout
export default ProductPage
